
/* Menu Navigation */
import {Color} from "@swimlane/ngx-charts";

export const STATUS_OPTIONS: string[] = ['ok', 'quebrado', 'conserto', 'analise'];
export const BRANCH_OPTIONS: string[] = ['Microsoft', 'Apple', 'HP', 'Lenovo', 'Positivo', 'Epson', 'Others'];
export const TYPE_OPTIONS: string[] = ['Computador', 'Celular', 'Impressora', 'Monitor', 'Partes'];

export const DISPLAY_COLUMNS: string[] = [ 'name', 'status', 'fru', 'serial', 'type', 'owner', 'branch', 'invoice', 'createdAt'];

/* Messages */
export const NEW_DEVICE_SUCCESS: string = 'Device has been registered successfully';
export const NEW_DEVICE_ERROR: string = 'Error registering device. Please try again.';

/* URL */
export const PROD_HOST = 'https://control-tech-api-production.up.railway.app/';
export const DEV_HOST = 'http://localhost:8081';
export const API_DEVICES = 'api/devices';
export const LOGIN = 'api/auth/login';

export const SCHEMA_CHART_COLORS = <Color>{
    domain: ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
};
