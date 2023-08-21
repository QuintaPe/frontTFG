export const USER_ROUTES = {
  PROFILE: { path: 'profile', url: 'user/profile' },
  BOOKINGS: { path: 'bookings', url: 'user/bookings' },
  FAVORITE_CAMPINGS: { path: 'favorites', url: 'user/favorites'},
  CONVERSATIONS: { path: 'conversations', url: 'user/conversations'},
  CONVERSATION: { path: 'conversations/:id', url: 'user/conversations/:id'},

  setConversation: (id: string) => `user/conversations/${id}`,
}

export const MANAGER_ROUTES = {
  CAMPINGS: { path: 'campings', url: 'manager/campings'},
  NEW_CAMPING: { path: 'campings/new', url: 'manager/campings/new'},
  VIEW_CAMPING: { path: 'campings/:id', url: 'manager/campings/:id'},
  EDIT_CAMPING: { path: 'campings/:id/edit', url: 'manager/campings/:id/edit'},
  PROFILE: { path: 'profile', url: 'manager/profile' },
  CONVERSATIONS: { path: 'conversations', url: 'manager/conversations'},
  CONVERSATION: { path: 'conversations/:id', url: 'manager/conversations/:id'},

  setViewCamping: (id: string) => `manager/campings/${id}`,
  setEditCamping: (id: string) => `manager/campings/${id}/edit`,
  setConversation: (id: string) => `manager/conversations/${id}`,
}

export const ADMIN_ROUTES = {
  CAMPINGS: { path: 'campings', url: 'admin/campings'},
  BOOKINGS: { path: 'bookings', url: 'admin/bookings'},
  USERS: { path: 'users', url: 'admin/users'},
  PROFILE: { path: 'profile', url: 'admin/profile' },
  CONVERSATIONS: { path: 'conversations', url: 'admin/conversations'},
  CONVERSATION: { path: 'conversations/:id', url: 'admin/conversations/:id'},

  setConversation: (id: string) => `admin/conversations/${id}`,
}

export const CAMPINGS_ROUTES = {
  CAMPINGS: { path: '', url: 'campings'},
  CAMPING: { path: ':id', url: 'campings/:id'},
  BOOK_CAMPING: { path: ':id/booking', url: 'campings/:id/booking'},

  setCamping: (id: string) => `campings/${id}`,
  setBookCamping: (id: string) => `campings/${id}/booking`,
}

export const AUTH_ROUTES = {
  LOGIN: { path: 'login', url: 'auth/login' },
  SIGNUP: { path: 'signup', url: 'auth/signup' },
  SIGNUP_MANAGER: { path: 'manager/signup', url: 'auth/manager/signup' },
  FORGOT_PASSWORD: { path: 'recovery-password', url: 'auth/recovery-password' },
  RECOVERY_PASSWORD: { path: 'recovery-password/:token', url: 'auth/recovery-password/:token' },
  LOGOUT: { path: 'logout', url: 'auth/logout' },

  setRecoveryPassword: (token: string) => `auth/recovery-password/${token}`,
}
