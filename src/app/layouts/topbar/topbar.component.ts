import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../core/services/event.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { LAYOUT_MODE } from "../layouts.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar Component
 */
export class TopbarComponent implements OnInit {

  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  userName: any;
  role: any;
  contactData: any = [];
  unread: any = [];
  remainingDays: number = 5;
  passwordForm!: FormGroup;
  submitted = false;
  passwordSubmit = false;
  passwordUpdate: any = {};
  oldPassword: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private eventService: EventService,
    private UserProfileService: UserProfileService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
  ) {
    this.userName =ls.get('UserName', { decrypt: true });
    this.role = ls.get('Role', { decrypt: true });
  }

  /**
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  layoutMode!: string;
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentpwd: ['', Validators.required],
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });
    this.layoutMode = LAYOUT_MODE;
    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
    if (this.role == 'MainAdmin') {
      this.getContactData();
    }
  }
  onPasswordSubmit() {
    this.passwordSubmit = true;
    if (this.passwordForm.invalid) {
      return;
    }
    else {
      this.updatePassword();
    }
  }
  get p() { return this.passwordForm.controls; }

  updatePassword() {
    this.passwordUpdate.id =ls.get('UserId', { decrypt: true });
    this.passwordUpdate.currentPassword = this.p.currentpwd.value;
    this.passwordUpdate.password = this.p.password.value;
    this.UserProfileService.updatePasswordAdmin(this.passwordUpdate).subscribe((req) => {
      this.toastr.success('Your password has been successfully changed.', 'success', {
        timeOut: 3000,
      });
      this.modalService.dismissAll();
      this.router.navigate(['/account/login']);
    })
  }
 
  getContactData() {
    this.unread = [];
    this.UserProfileService.getSupportData().subscribe((res: any) => {
      if (res.length == 0) {
        // this.buyerData.length = 0;
      } else {
        this.contactData = res;
        this.contactData.forEach((element: any) => {
          if (element.isactive == true) {
            this.unread.push(element);
          }
        });
      }
    })
  }
  openPasswordModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  openEmail(id: any) {
    this.UserProfileService.emailMarkAsRead(id).subscribe((res: any) => {
      if (res.length == 0) {
      } else {
        this.ngOnInit();
        this.router.navigate(['/read/' + id]);
      }
    })
  }

  /**
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }
  verifyOldPassword(){
    let data={
      oldPassword:ls.get('Password', { decrypt: true }),
      enteredPassword:this.p.currentpwd.value
    }
    this.UserProfileService.verifyOldAdminPassword(data).subscribe((res:any)=>{
      if(res == 'sucess'){

      }else{
        this.toastr.error('Incorrect Password !....please check your Password.', 'Incorrect Password', {
          timeOut: 3000,
        });
      }
    })
  }

  /**
   * Logout the user
   */
  logout() {
    if (environment.defaultauth === 'firebase') {
      this.authService.logout();
    } else {
      this.authFackservice.logout();
    }
    this.router.navigate(['/account/login']);
  }

}
