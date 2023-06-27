export const MANAGER_ROUTES = {
  CAMPINGS: { path: 'campings', url: 'manager/campings'},
  NEW_CAMPING: { path: 'campings/new', url: 'manager/campings/new'},
  VIEW_CAMPING: { path: 'campings/:id', url: 'manager/campings/:id'},
  EDIT_CAMPING: { path: 'campings/:id/edit', url: 'manager/campings/:id/edit'},
  PROFILE: { path: 'profile', url: 'user/profile' },

  setViewCamping: (id: string) => `manager/campings/${id}`,
  setEditCamping: (id: string) => `manager/campings/${id}/edit`,
}

export const ADMIN_ROUTES = {
  CAMPINGS: { path: 'campings', url: 'admin/campings'},
  BOOKINGS: { path: 'bookings', url: 'admin/bookings'},
  USERS: { path: 'users', url: 'admin/users'},
  PROFILE: { path: 'profile', url: 'user/profile' },
}

export const CAMPINGS_ROUTES = {
  CAMPING: { path: ':id', url: 'campings/:id'},
  BOOK_CAMPING: { path: ':id/booking', url: 'campings/:id/booking'},

  setCamping: (id: string) => `campings/${id}`,
  setBookCamping: (id: string) => `campings/${id}/booking`,
}

export const AUTH_ROUTES = {
  LOGIN: { path: 'login', url: 'auth/login' },
  SIGNUP: { path: 'signup', url: 'auth/signup' },
  SIGNUP_MANAGER: { path: 'manager/signup', url: 'auth/manager/signup' },
}

export const USER_ROUTES = {
  PROFILE: { path: 'profile', url: 'user/profile' },
  BOOKINGS: { path: 'bookings', url: 'user/bookings' },
}

