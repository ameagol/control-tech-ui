import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceRegisterComponent} from './device-register/device-register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/register', component: DeviceRegisterComponent },
  { path: 'devices/report', component: DeviceRegisterComponent },
  { path: 'profile', component: DeviceRegisterComponent }
];
