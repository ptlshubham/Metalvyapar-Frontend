import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import ls from 'localstorage-slim';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { EventService } from 'src/app/core/services/event.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();
  menuItems: MenuItem[] = [];
  islogin: boolean = false;
  isUser: any;
  userName: any;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    private eventService: EventService,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
  ) { }

  ngOnInit(): void {
    this.isUser =ls.get('UserId', { decrypt: true });
    this.userName =ls.get('UserName', { decrypt: true }) ;
  }
  /**
  * Toggle the menu bar when having mobile screen
  */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
  onMenuClick(event: any) {
    const nextEl = event.target.nextElementSibling;
    if (nextEl) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('show');
      }
      nextEl.classList.toggle('show');
    }
    return false;
  }
  logout() {
    if (environment.defaultauth === 'firebase') {
      this.authService.logout();
    } else {
      this.authFackservice.logout();
    }
    this.router.navigate(['/account/login']);
  }

  userLogin() {
    this.islogin = true;
  }
  routeUserLogin() {
    if (this.islogin = true) {
      this.router.navigate(['/landing/user-home']);
    }
    else {
      this.router.navigate(['/pages/home']);
    }

  }

}


