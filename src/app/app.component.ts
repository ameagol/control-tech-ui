import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
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
import {filter, Observable, Subscription} from "rxjs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LoadingService} from "./services/loading.service";
import {NAVIGATION_MENU, UIRoutes} from "./constants/device-options.constants";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    MatProgressBarModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public date: number = 0;
  private authSubscription: Subscription = new Subscription();
  private routerSubscription!: Subscription;
  loading$: Observable<boolean>;
  email: string | null = null;
  isAuthenticated: boolean = false;
  activeTabIndex = 0;
  navs = NAVIGATION_MENU;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.date = Date.now()
    this.authSubscription = this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            this.email = decodedToken?.sub || 'Unknown User';
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      } else {
        this.router.navigate([UIRoutes.LOGIN]);
      }
    });

    this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const currentRoute = this.router.url.split('?')[0];
          this.activeTabIndex = this.navs.findIndex(nav => nav.route === currentRoute);
        });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate([UIRoutes.LOGIN]);
  }

  changeRounte(route: any) {
    this.router.navigate([route]);
  }

  onTabChange(index: number): void {
    const selectedNav = this.navs[index];
    this.router.navigate([selectedNav.route]);
  }

  profile() {
    // to-do
  }
}
