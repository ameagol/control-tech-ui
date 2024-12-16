import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceComponent} from './device-register/device.component';
import {HomeComponent} from "./home/home.component";
import {ReportsComponent} from "./device-bi/reports.component";
import {SubscribeComponent} from "./subscribe/subscribe.component";
import {CompanyComponent} from "./create-company/company.component";
import {StatusComponent} from "./status/status.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/register', component: DeviceComponent, data: { refreshComponent: true } },
  { path: 'devices/report', component: DeviceComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'company/create', component: CompanyComponent },
  { path: 'status', component: StatusComponent },
  { path: 'reports', component: ReportsComponent }
];
