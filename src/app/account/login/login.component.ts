import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;
  role: any = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    public toastr: ToastrService,
  ) {
    // redirect to home if already logged in
    ls.clear();
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  public onChangeRole(val: any) {
    this.role = val.value;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userService.userLogin(this.f.email.value, this.f.password.value, this.role).subscribe((res: any) => {
        if (res.length > 0) {
          // localStorage.setItem('Role', res[0].Role);
          ls.set('Role', res[0].Role, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
          ls.set('UserName', res[0].CompanyName, { encrypt: true }); 
          ls.set('Email', res[0].Email, { encrypt: true });
          ls.set('UserId', res[0].Id, { encrypt: true });
          ls.set('isProfile', res[0].isProfile, { encrypt: true });
          ls.set('material_quality', res[0].MaterialQuality, { encrypt: true });
          ls.set('token', res[0].token, { encrypt: true });
          this.toastr.success('Welcome back', 'Success', {
                timeOut: 3000,
              });
              this.router.navigate(['landing/user-home']);
        
        } else if (res == 1) {
          this.toastr.error('Incorrect Email !....please check your Email.', 'Incorrect Email', {
            timeOut: 3000,
          });
        } else if (res == 5) {
          this.toastr.error('No Subcription !....please contact Admin.', 'Not Subscribe', {
            timeOut: 3000,
          });
        } 
        else {
          this.toastr.error('Incorrect Password !....please check your Password.', 'Incorrect Password', {
            timeOut: 3000,
          });
        }
      })
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
