import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  validationForm!: FormGroup;
  submitted = false;
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  stateData: any = [];
  selectedState: any;
  public customerModel: any;
  userId: any;
  multiDefaultOption: any = '';
  Default = [];
  cityListData: any = [];
  cityData: any = [];
  selectedCity: any;

  constructor(
    public formBuilder: FormBuilder,
    public userservice: UserProfileService,
    public router: Router,
    public apiservice: ApiService,
    public toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    this.getStateList();
    this.getQualityData();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.userId = res.data;
      this.userservice.getUserDetail(this.userId).subscribe((res: any) => {
        this.customerModel = res[0];
        this.customerModel.AccType = 'current';
        this.selectedState = this.customerModel.state;
        this.customerModel.newAccNo = this.customerModel.BankAccNo;
        this.customerModel.confirmAccNo = this.customerModel.BankAccNo;
        let ab = this.customerModel.MaterialQuality.split(',');
        this.multiDefaultOption = ab;
        this.imageUrl = this.customerModel.CancelCheque
        if (this.imageUrl != undefined || this.imageUrl != null) {
          this.imageUrl = 'assets/images/file-upload-image.jpg';
        }
      })
    });
    this.validationForm = this.formBuilder.group({
      select: [{ value: '', disabled: true }, [Validators.required]],
      regAs: [{ value: '', disabled: true }, [Validators.required]],
      fname: [{ value: '', disabled: true }, [Validators.required]],
      lname: [{ value: '', disabled: true }, [Validators.required]],
      contact: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
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
      newAccNo: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      confirmAccNo: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
      branchName: [{ value: '', disabled: true }, [Validators.required]],
      ISFC: [{ value: '', disabled: true }, [Validators.required]],


    }, {
      validators: this.ConfirmedValidator('newAccNo', 'confirmAccNo')
    });
  }
  getQualityData() {
    this.Default = [];
    this.userservice.getQualityListJson().subscribe((res: any) => {
      this.Default = res;
    })
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get f() { return this.validationForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.validationForm
    this.customerModel;
     

    this.userservice.confirmKYCUser(this.customerModel).subscribe((res: any) => {
       
      if (res == 'success') {
        this.router.navigate(['/landing/user-home']);
      } else {
        this.toastr.error('Something went wrong! try after sometime.', 'Try again.', {
          timeOut: 3000,
        });
      }
    })


  }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.userservice.uploadCancelCheckImage(formdata).subscribe((response) => {
          this.materialImage = response;
          this.customerModel.CancelCheque = this.materialImage;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
    }
  }
  removeImage() {
    this.imageUrl = '';
  }
  getStateList() {
    this.userservice.getStateFromJson().subscribe((res: any) => {
      this.stateData = res;
      this.selectedState = this.customerModel.state;
      this.getCityListAccordingState()
    })
  }
  selectStateData(e: any): void {
    this.selectedState = e.target.value;
    this.customerModel.state = e.target.value;
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
