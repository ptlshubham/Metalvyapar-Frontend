import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user.service';
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
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  // Carousel navigation arrow show
  showNavigationArrows: any;
  fieldTextType!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserProfileService,
    private router: Router,
    public toastr: ToastrService

  ) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['admin@nextgen', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userService.adminLogin(this.f.email.value, this.f.password.value).subscribe((res: any) => {

        if (res.length > 0) {
           
          ls.set('Role', res[0].role, { encrypt: true }); 
          ls.set('UserName', res[0].firstName+''+res[0].lastName, { encrypt: true }); 
          ls.set('Email', res[0].email, { encrypt: true }); 
          ls.set('UserId', res[0].id, { encrypt: true }); 
          ls.set('authenticationAdminToken', res[0].token, { encrypt: true });   
          ls.set('password', res[0].password, { encrypt: true }); 
          this.router.navigate(['/']);
          this.toastr.success('Welcome back', 'Success', {
            timeOut: 3000,
          });
        } else if (res == 1) {
          this.toastr.error('Incorrect Email !....please check your Email.', 'Incorrect Email', {
            timeOut: 3000,
          });
        } else {
          this.toastr.error('Incorrect Password !....please check your Password.', 'Incorrect Password', {
            timeOut: 3000,
          });
        }
      });
    }
  }

  /**
   * Testimonial slider
   */
  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
