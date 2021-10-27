export enum types {
	uiOpenModal = '[UI open modal]',
	uiCloseModal = '[UI] close modal',

	eventSetActive = '[EVENT] set active',
	eventAddNew = '[EVENT] Add new',
	eventStartAddNew = '[EVENT Start add new]',
	eventClearActiveEvent = '[EVENT] clear active event',
	eventUpdate = '[Event] event update',
	eventDeleted = '[Event] event deleted',
	eventLoaded = '[Event] Events loaded',
	eventLogout = '[Event] Events logout',

	authChecking = '[Auth] checking login state',
	authCheckingFinish = '[Auth] Finish checking login state',
	authStartLogin = '[Auth] Start login',
	authLogin = '[Auth] Login',
	authStarRegister = '[Auth] Start segister',
	authStartTokenRenew = '[Auth] Start token renew',
	authLogout = '[Auth] Logout',
}
