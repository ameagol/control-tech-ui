/**
 * Options user for each Device
 */
export const TYPE_OPTIONS: string[] = [
    'Computador',
    'Notebook',
    'Rede',
    'Som',
    'Celular',
    'Impressora',
    'Monitor',
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
export const PROD_HOST = 'http://localhost:8080/';
export enum API {
    UI_HOST = 'https://control-tech-ui.vercel.app/',
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
    { label: 'Clientes', icon: 'corporate_fare', route: '/company/create' },
    { label: 'Status', icon: 'add_task', route: '/status' },
    { label: 'Relatorios', icon: 'insert_chart', route: '/reports' },
];
