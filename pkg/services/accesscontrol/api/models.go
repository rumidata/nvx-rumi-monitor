package api

// This file contains the swagger descriptions of the parameters and reponses
// associated with the access-control API endpoints.

// swagger:parameters searchPermissions
type SearchPermissionsParams struct {
	// in:query
	// required:false
	UserId int64 `json:"userId"`

	// in:query
	// required:false
	UserLogin string `json:"userLogin"`

	// in:query
	// required:false
	ActionPrefix string `json:"actionPrefix"`

	// in:query
	// required:false
	Action string `json:"action"`

	// in:query
	// required:false
	Scope string `json:"scope"`
}

// PermissionsByAction are permissions with scopes grouped by action
// example: { "teams.read": [ "teams:id:1", "teams:id:2" ] }
// swagger:model
type PermissionsByAction map[string][]string

// UserID
// example: 12
// pattern: \d+
// swagger:model
type UserID string

// UsersPermissions are permissions grouped by userID
// example: { "1": { "teams.read": [ "teams:id:1", "teams:id:2" ] }, "3": { "teams.read": [ "teams:id:3" ] } }
// swagger:model
type UsersPermissions map[UserID]PermissionsByAction

// swagger:response searchPermissionsResponse
type SearchPermissionsResponse struct {
	// in: body
	Body UsersPermissions `json:"body"`
}