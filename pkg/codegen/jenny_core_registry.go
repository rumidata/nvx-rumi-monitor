package codegen

import (
	"bytes"
	"fmt"

	"cuelang.org/go/cue"
	"github.com/grafana/codejen"
	"path/filepath"
	"strings"
)

var registryPath = filepath.Join("pkg", "registry", "schemas")

// CoreRegistryJenny generates a registry with all core kinds.
type CoreRegistryJenny struct {
}

func (jenny *CoreRegistryJenny) JennyName() string {
	return "CoreRegistryJenny"
}

func (jenny *CoreRegistryJenny) Generate(cueFiles []CueSchema) (codejen.Files, error) {
	schemas := make([]Schema, len(cueFiles))
	for i, v := range cueFiles {
		name, err := getSchemaName(v.CueFile)
		if err != nil {
			return nil, err
		}

		schemas[i] = Schema{
			Name:     name,
			FilePath: v.FilePath,
		}
	}

	buf := new(bytes.Buffer)
	if err := tmpls.Lookup("core_registry.tmpl").Execute(buf, tvars_registry{
		Schemas: schemas,
	}); err != nil {
		return nil, fmt.Errorf("failed executing kind registry template: %w", err)
	}

	file := codejen.NewFile(filepath.Join(registryPath, "core_kind.go"), buf.Bytes(), jenny)
	return codejen.Files{*file}, nil
}

func getSchemaName(v cue.Value) (string, error) {
	name, err := getPackageName(v)
	if err != nil {
		return "", err
	}

	name = strings.Replace(name, "-", "_", -1)
	return strings.ToLower(name), nil
}
