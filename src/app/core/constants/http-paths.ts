export enum HttpPaths {
  API_LOGIN = '/api/auth/token',
  API_LOGOUT = '/api/logout',
  ///////////// Users /////////////
  API_UPSERT_USER = '/api/users/upsert',
  API_GET_ALL_USER = '/api/users/getAll',
  API_TOGGLE_USER = '/api/users/toggelActive/',
  API_DELETE_USER = '/api/users/delete/',
  Api_GET_USERS_PROFILE = '/api/users/GetProfile/',

  ///////////// Lookups /////////////

  API_LIST_OF_ROLES='/api/roles/listOf',
  API_LIST_OF_NATIONALITIES='/api/nationalities/listOf',
  API_LIST_OF_COUNTRIES='/api/countries/listOf',
}
