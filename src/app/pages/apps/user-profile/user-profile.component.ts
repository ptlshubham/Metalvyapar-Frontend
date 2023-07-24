import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MustMatch } from '../../form/validation/validation.mustmatch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from 'src/app/core/services/user.service';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * User Profile Component
 */
export class UserProfileComponent implements OnInit {
  role: any;
  validationForm!: FormGroup;
  passwordForm!: FormGroup;
  isPwdOpen: boolean = false;
  userDetails: any = {};
  stateData: any = [];
  submitted = false;
  passwordSubmit = false;
  selectedState: any;
  multiDefaultOption: any = '';
  breadCrumbItems!: Array<{}>;
  Default: any = [];
  passwordUpdate: any = {};
  oldPassword:any;
  @ViewChild('imageViewer')
  viewer!: UserProfileComponent;
  fullscreen: boolean = false;
  imageIndex: number = 0;
  remainingDays: number = 5;

  // url: string = "https://api.metalvyapar.com";
  url: string = "https://api.metalvyapar.com";
  images: Array<string> = [
    'https://procodestore.com/wp-content/uploads/2021/03/164508084_271381191136191_654097929788476286_n.jpg',
    'https://freemediatools.com/img/profile.jpg'
  ];
  constructor(
    public formBuilder: FormBuilder,
    private userservice: UserProfileService,
    private router:Router,
    public toastr: ToastrService,
    private modalService: NgbModal,

  ) {
    this.role =ls.get('Role', { decrypt: true });;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Profile', active: true }
    ];
    this.userservice.getUserDetail(ls.get('UserId', { decrypt: true })).subscribe((res: any) => {
      this.userDetails = res[0];
      this.oldPassword = this.userDetails.Password;
      let ab = this.userDetails.MaterialQuality.split(',');
      this.multiDefaultOption = ab;
      this.userDetails.address = this.userDetails.landmark + ' ' + this.userDetails.street + ' ' + this.userDetails.city + '-' + this.userDetails.pincode + ' ' + this.userDetails.state;
    })
    this.getStateList();
    this.validationForm = this.formBuilder.group({
      select: [{ value: '', disabled: true }, [Validators.required]],
      regAs: [{ value: '', disabled: true }, [Validators.required]],
      fname: [{ value: '', disabled: true }, [Validators.required]],
      lname: [{ value: '', disabled: true }, [Validators.required]],
      contact: [{ value: '', disabled: true }, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      companyname: [{ value: '', disabled: true }, [Validators.required]],
      designation: [{ value: '', disabled: true }, [Validators.required]],
      gstno: [{ value: '', disabled: true }, [Validators.required]],
      pancard: [{ value: '', disabled: true }, [Validators.required]],
      workphone: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      city: [{ value: '', disabled: true }, [Validators.required]],
      selectState: [{ value: '', disabled: true }, [Validators.required]],
      landmark: [{ value: '', disabled: true }],
      multiDefaultOption: [{ value: '', disabled: true }, [Validators.required]],
      pincode: [{ value: '', disabled: true }, [Validators.required, Validators.min(6)]],
      avg_mnth_trade: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      selectAcc: [{ value: '', disabled: true }, [Validators.required]],
      acHolder: [{ value: '', disabled: true }, [Validators.required]],
      bankName: [{ value: '', disabled: true }, [Validators.required]],
      bankACNo: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      branchName: [{ value: '', disabled: true }, [Validators.required]],
      ISFC: [{ value: '', disabled: true }, [Validators.required]],
      cancelCheque: [{ value: '', disabled: true }, [Validators.required]]
    });

    this.passwordForm = this.formBuilder.group({
      currentpwd: ['', Validators.required],
      password: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmpwd'),
    });
  }
  getQualityData() {
    this.Default = [];
    this.userservice.getQualityListJson().subscribe((res: any) => {
      this.Default = res;
    })
  }
  get f() { return this.validationForm.controls; }
  get p() { return this.passwordForm.controls; }

  verifyOldPassword(){
    let data={
      oldPassword:this.oldPassword,
      enteredPassword:this.p.currentpwd.value
    }
    this.userservice.verifyOldPassword(data).subscribe((res:any)=>{
      if(res == 'sucess'){

      }else{
        this.toastr.error('Incorrect Password !....please check your Password.', 'Incorrect Password', {
          timeOut: 3000,
        });
      }
    })
  }
  centerModal(centerDataModal: any,imagesrc:any) {
    this.images = [];
    this.images.push(this.url+''+imagesrc);
    this.modalService.open(centerDataModal, { centered: true, windowClass: 'modal-holder' });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validationForm.invalid) {
      return;
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
  updatePassword() {
    this.passwordUpdate.id = this.userDetails.UserId;
    this.passwordUpdate.currentPassword = this.p.currentpwd.value;
    this.passwordUpdate.password = this.p.password.value;
    this.userservice.updatePassword(this.passwordUpdate).subscribe((req) => {
      this.toastr.success('Your password has been successfully changed.', 'success', {
        timeOut: 3000,
      });
      this.router.navigate(['/account/login']);
    })
  }
  openPasswordEdit() {
    this.isPwdOpen = true;
      this.userservice.updatePassword(this.passwordUpdate).subscribe((req) => {
      // this.toastr.success('Your password has been successfully changed.', 'success', {
      //   timeOut: 3000,
      // });
      this.router.navigate(['/account/login']);
    })

  }
  closePasswordEdit() {
    this.isPwdOpen = false;
  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
      this.selectedState = this.userDetails.state;
    })
  }
}

