export const CAMPINGS_MANAGEMENT_ROUTES = {
  CAMPINGS: { path: '', url: 'manager/campings'},
  NEW_CAMPING: { path: 'new', url: 'manager/campings/new'},
  VIEW_CAMPING: { path: ':id', url: 'manager/campings/:id'},
  EDIT_CAMPING: { path: ':id/edit', url: 'manager/campings/:id/edit'},

  setViewCamping: (id: string) => `manager/campings/${id}`,
  setEditCamping: (id: string) => `manager/campings/${id}/edit`,
}

export const AUTH_ROUTES = {
  LOGIN: { path: 'login', url: 'auth/login' },
  SIGNUP: { path: 'signup', url: 'auth/signup' },
  SIGNUP_MANAGER: { path: 'manager/signup', url: 'auth/manager/signup' },
}
