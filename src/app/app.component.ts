import {Component, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatIcon,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'control-tech';
  public date: number = 0;

  navs = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Devices', icon: 'devices',  route: '/devices' },
    { label: 'Add Device', icon: 'library_add',  route: '/devices/register' },
    { label: 'Profile', icon: 'settings' },
    { label: 'Help', icon: 'help', state: '#' },
  ];

  secondaryNavs = [
    'Home',
    'Device',
    'Profile',
    'Help'
  ];
  smiley = ':)';

  constructor() {}

  ngOnInit() {
    this.date = Date.now();
  }

}
