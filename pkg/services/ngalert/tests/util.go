package tests

import (
	"context"
	"encoding/json"
	"fmt"
	"testing"
	"time"

	"github.com/grafana/grafana/pkg/api/routing"
	busmock "github.com/grafana/grafana/pkg/bus/mock"
	"github.com/grafana/grafana/pkg/infra/log"
	acmock "github.com/grafana/grafana/pkg/services/accesscontrol/mock"
	"github.com/grafana/grafana/pkg/services/dashboards"
	databasestore "github.com/grafana/grafana/pkg/services/dashboards/database"
	dashboardservice "github.com/grafana/grafana/pkg/services/dashboards/service"
	"github.com/grafana/grafana/pkg/services/featuremgmt"
	"github.com/grafana/grafana/pkg/services/ngalert"
	"github.com/grafana/grafana/pkg/services/ngalert/metrics"
	"github.com/grafana/grafana/pkg/services/ngalert/models"
	"github.com/grafana/grafana/pkg/services/ngalert/store"
	"github.com/grafana/grafana/pkg/services/secrets/database"
	secretsManager "github.com/grafana/grafana/pkg/services/secrets/manager"
	"github.com/grafana/grafana/pkg/services/sqlstore"
	"github.com/grafana/grafana/pkg/setting"
	"github.com/grafana/grafana/pkg/util"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/stretchr/testify/require"
)

// SetupTestEnv initializes a store to used by the tests.
func SetupTestEnv(tb testing.TB, baseInterval time.Duration) (*ngalert.AlertNG, *store.DBstore) {
	tb.Helper()

	cfg := setting.NewCfg()
	cfg.UnifiedAlerting = setting.UnifiedAlertingSettings{
		BaseInterval: setting.SchedulerBaseInterval,
	}
	// AlertNG database migrations run and the relative database tables are created only when it's enabled
	cfg.UnifiedAlerting.Enabled = new(bool)
	*cfg.UnifiedAlerting.Enabled = true

	m := metrics.NewNGAlert(prometheus.NewRegistry())
	sqlStore := sqlstore.InitTestDB(tb)
	secretsService := secretsManager.SetupTestService(tb, database.ProvideSecretsStore(sqlStore))
	dashboardStore := databasestore.ProvideDashboardStore(sqlStore, featuremgmt.WithFeatures())

	ac := acmock.New()
	features := featuremgmt.WithFeatures()
	folderPermissions := acmock.NewMockedPermissionsService()
	dashboardPermissions := acmock.NewMockedPermissionsService()

	dashboardService := dashboardservice.ProvideDashboardService(
		cfg, dashboardStore, nil,
		features, folderPermissions, dashboardPermissions, ac,
	)

	bus := busmock.New()
	folderService := dashboardservice.ProvideFolderService(
		cfg, dashboardService, dashboardStore, nil,
		features, folderPermissions, ac, bus,
	)

	ng, err := ngalert.ProvideService(
		cfg, nil, nil, routing.NewRouteRegister(), sqlStore, nil, nil, nil, nil,
		secretsService, nil, m, folderService, ac, &dashboards.FakeDashboardService{}, nil, bus,
	)
	require.NoError(tb, err)
	return ng, &store.DBstore{
		SQLStore: ng.SQLStore,
		Cfg: setting.UnifiedAlertingSettings{
			BaseInterval: baseInterval * time.Second,
		},
		Logger:           log.New("ngalert-test"),
		DashboardService: dashboardService,
	}
}

// CreateTestAlertRule creates a dummy alert definition to be used by the tests.
func CreateTestAlertRule(t testing.TB, ctx context.Context, dbstore *store.DBstore, intervalSeconds int64, orgID int64) *models.AlertRule {
	return CreateTestAlertRuleWithLabels(t, ctx, dbstore, intervalSeconds, orgID, nil)
}

func CreateTestAlertRuleWithLabels(t testing.TB, ctx context.Context, dbstore *store.DBstore, intervalSeconds int64, orgID int64, labels map[string]string) *models.AlertRule {
	ruleGroup := fmt.Sprintf("ruleGroup-%s", util.GenerateShortUID())
	_, err := dbstore.InsertAlertRules(ctx, []models.AlertRule{
		{

			ID:        0,
			OrgID:     orgID,
			Title:     fmt.Sprintf("an alert definition %s", util.GenerateShortUID()),
			Condition: "A",
			Data: []models.AlertQuery{
				{
					Model: json.RawMessage(`{
										"datasourceUid": "-100",
										"type":"math",
										"expression":"2 + 2 > 1"
									}`),
					RelativeTimeRange: models.RelativeTimeRange{
						From: models.Duration(5 * time.Hour),
						To:   models.Duration(3 * time.Hour),
					},
					RefID: "A",
				},
			},
			Labels:          labels,
			Annotations:     map[string]string{"testAnnoKey": "testAnnoValue"},
			IntervalSeconds: intervalSeconds,
			NamespaceUID:    "namespace",
			RuleGroup:       ruleGroup,
			NoDataState:     models.NoData,
			ExecErrState:    models.AlertingErrState,
		},
	})
	require.NoError(t, err)

	q := models.ListAlertRulesQuery{
		OrgID:         orgID,
		NamespaceUIDs: []string{"namespace"},
		RuleGroup:     ruleGroup,
	}
	err = dbstore.ListAlertRules(ctx, &q)
	require.NoError(t, err)
	require.NotEmpty(t, q.Result)

	rule := q.Result[0]
	t.Logf("alert definition: %v with title: %q interval: %d created", rule.GetKey(), rule.Title, rule.IntervalSeconds)
	return rule
}
