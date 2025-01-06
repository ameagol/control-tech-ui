/**
 * Options user for each Device
 */
export const DEVICE_GROUP_OPTIONS: string[] = [
    'Computador',
    'Notebook',
    'Rede',
    'Som',
    'Celular',
    'Impressora',
    'Monitor',
    'Midia',
    'Partes'
];

/**
 * Message presented in Dialogs
 */
export const NEW_DEVICE_SUCCESS: string = 'Device has been registered successfully';
export const NEW_DEVICE_ERROR: string = 'Error registering device. Please try again.';

/**
 * Routes for BackEnd Interface
 */
export const PROD_HOST = 'https://control-tech-api-production.up.railway.app/';
// export const PROD_HOST = 'http://localhost:8080/';
export enum API {
    UI_HOST = 'https://control-tech-ui.vercel.app/',
    // UI_HOST = 'http://localhost:4200/',
    DEVICES = 'api/devices',
    LOGIN = 'api/auth/login',
    NEW_SUBSCRIBE = 'api/subscribe',
    COMPANIES = 'api/companies',
    STATUS = 'api/status',
}

/**
 *  Routes for Link Interfaces and Pages
 */
export enum UIRoutes {
    DEVICE_REGISTER = '/devices/register',
    DEVICE_LIST = '/devices/list',
    HOME = '/home',
    LOGIN = '/login',
    SUBSCRIBE = '/subscribe',
}

export const NAVIGATION_MENU = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Dispositivos', icon: 'devices', route: '/devices' },
    { label: 'Cadastrar', icon: 'add_circle', route: '/devices/register' },
    { label: 'Meus Clientes', icon: 'corporate_fare', route: '/company/create' },
    { label: 'Meus Status', icon: 'add_task', route: '/status' },
    { label: 'Graficos', icon: 'insert_chart', route: '/reports' },
    // { label: 'Admin', icon: 'admin_panel_settings', route: '/admin' },
];
