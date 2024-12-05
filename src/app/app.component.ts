import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import {CommonModule} from "@angular/common";
import {AuthService} from "./services/auth.service";
import {Subscription} from "rxjs";

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'Control Tech';
  public date: number = 0;
  username: string | null = null;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription();

  navs = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Dispositivos', icon: 'devices', route: '/devices' },
    { label: 'Cadastrar', icon: 'add_circle', route: '/devices/register' },
    { label: 'Relatorios', icon: 'insert_chart', route: '/reports' },
  ];

  public activeLink = this.navs[0].route;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.date = Date.now();
    this.authSubscription = this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          this.username = decodedToken.sub;
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    // Clean up subscription when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  changeRounte(route: any) {
console.log(route);
    this.router.navigate([route]);
  }
}
