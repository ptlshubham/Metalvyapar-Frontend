import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user.service';
import { MustMatch } from 'src/app/pages/form/validation/validation.mustmatch';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss']
})
export class ForgotpwdComponent implements OnInit {

  resetForm!: FormGroup;
  unlockForm!: FormGroup;

  submitted = false;
  unlockSubmit = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  forgotBox: boolean = false;
  forgotPwdModel: any = {};
  resetPwdModel: any = {};
  changePwd: boolean = false;
  otpBox: boolean = false;
  emailResp: any;
  otpResp: any;
  userOtp: any;
  userEmail: any;
  newPassword:any;
  fname:any;
  lname:any;
  email:any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '50px'
    }
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userProfileService: UserProfileService,
    public toastr: ToastrService

  ) { }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.unlockForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),

    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }
  get a() { return this.unlockForm.controls; }


  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    else {
      let data = {
        email: this.f.email.value,
      }
      this.userEmail = data.email;
       
      this.userProfileService.forgotAdminPwd(data).subscribe((data:any) => {
        this.emailResp = data[0].id;
        this.fname = data[0].firstName;
        this.lname = data[0].lastName;
        this.email = data[0].email;
        this.forgotBox = true;
        this.changePwd = false;
        this.otpBox = true;
      });
    }
  }
  onOtpChange(otp: any) {
    this.userOtp = otp;
  }
  resendEmail() {
    this.changePwd = false;
    this.otpBox = false;
    this.forgotBox = false
  }
  saveOTP() {
    this.forgotPwdModel.id = this.emailResp;
    this.forgotPwdModel.otp = this.userOtp;
    this.userProfileService.getAdminOneTimePwd(this.forgotPwdModel).subscribe((data:any) => {
        
      // this.forgotPwdModel = {};
      if(data.length>0){
        this.otpResp = data[0].userid;
        this.changePwd = true;
        this.otpBox = false;
        this.forgotBox = true
      }
      else{
        //Error msg here for wrong OTP
      }
     
    });
  }
  onResetSubmit() {
    this.unlockSubmit = true;
    if (this.unlockForm.invalid) {
      return;
    }
    else {
      this.changeForgotPwd();
    }
  }
  changeForgotPwd() {
     
    this.resetPwdModel.id = this.otpResp;
    this.resetPwdModel.password = this.a.password.value;
    this.resetPwdModel.fname = this.fname;
    this.resetPwdModel.lname = this.lname;
    this.resetPwdModel.email = this.email;
    this.userProfileService.updatePasswordAdmin(this.resetPwdModel).subscribe((req) => {
      this.toastr.success('Your password has been successfully changed.', 'success', {
        timeOut: 3000,
      });
      this.router.navigate(['/account/login']);
    })

  }

}

