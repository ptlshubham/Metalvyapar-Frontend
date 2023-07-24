import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  validationForm!: FormGroup;
  stateData: any = [];
  cityData: any = [];
  selectedState: any;
  selectedCity: any;
  submitted = false;
  cityListData: any = [];
  gstno: any;
  pancard: any;
  qualityList: any = [];
  multiDefaultOption: any = '';

  Default: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService,
    public toastr: ToastrService

  ) {
    this.getStateList();
    this.getQualityData();
  }
  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      select: ['', [Validators.required]],
      regAs: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      multiDefaultOption: ['', [Validators.required]],
      companyname: ['', [Validators.required]],
      desgination: ['', [Validators.required]],
      pancard: ['', [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      gstno: ['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$")]],
      workphone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      avg_mnth_trade: ['0', [Validators.required, Validators.min(1)]],
      // selectMaterial: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      selectState: ['', [Validators.required]],
      // selectCity: ['', [Validators.required]],
      landmark: [''],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],


      // selectAcc: ['', [Validators.required]],
      // acHolder: ['', [Validators.required]],
      // bankName: ['', [Validators.required]],
      // bankACNo: ['', [Validators.required, Validators.min(1)]],
      // branchName: ['', [Validators.required]],
    });
  }
  get f() { return this.validationForm.controls; }

  getQualityData() {
    this.Default = [];
    this.userservice.getQualityListJson().subscribe((res: any) => {
      const newFirstElement = 'Select All'
      this.Default = [newFirstElement].concat(res)

    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.validationForm.valid) {
      this.multiDefaultOption = this.validationForm.value.multiDefaultOption.toString();;
      this.validationForm.value.multiDefaultOption = this.multiDefaultOption;
      this.userservice.registerUser(this.validationForm.value).subscribe((res: any) => {
         
        if (res == 'sucess') {
          Swal.fire('Successfully!', 'Thank you for your request to register at MetalVyapar. Our team will contact you shortly. ', 'success');
          this.toastr.success('Thank you for your request to register at MetalVyapar. Our team will contact you shortly. ', 'KYC Update.', {
            timeOut: 3000,
          });
          this.router.navigate(['account/login']);
        } else if (res == 'duplicate email') {
          this.toastr.error('This email is already register, Please use another email.', 'Duplicate Email', {
            timeOut: 3000,
          });
        } 
        else if (res == 'duplicate GST') {
          this.toastr.error('This GST Number is already register, Please use another Number.', 'Duplicate GST No', {
            timeOut: 3000,
          });
        } 
        else {
          this.toastr.error('Something went wrong! try after sometime.', 'Try again.', {
            timeOut: 3000,
          });
        }
      })
    } else {
      this.toastr.error('Please Fill Details Properly.', 'Something is missing.', {
        timeOut: 3000,
      });
    }


  }
  selectQty(val: any) {
    if (val[0] == 'Select All') {
      this.multiDefaultOption = ['HR-CR (Low Carbon)', 'HR-CR (High Carbon)', 'Melting', 'Piece to piece', 'Turning', 'Turning Bundle'];
    }

  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
    })
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    this.getCityListAccordingState();
  }
  getCityListAccordingState() {
    this.cityListData = [];
    this.userservice.getCityFromJson().subscribe((res: any) => {
      this.cityData = res;
      this.cityData.forEach((element: any) => {
        if (element.state == this.selectedState) {
          this.cityListData.push(element);
        }
      });
    })
  }
  selectCityData(e: any): void {
    this.selectedCity = e.target.value
  }
}
function ViewChild(arg0: string): (target: UserRegisterComponent, propertyKey: "selectWrapper") => void {
  throw new Error('Function not implemented.');
}

