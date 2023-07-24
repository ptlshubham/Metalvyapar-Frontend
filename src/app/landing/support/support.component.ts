import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  validationForm!: FormGroup;
  submitted!: boolean;
  contactModel: any = {};
  longitude = 20.728218;
  latitude = 52.128973;
  markers: any;
  zoom: number = 15;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserProfileService,
    public toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader
  ) { }


  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const center = { lat: this.latitude, lng: this.longitude };
      });
    }
  }
  get f() { return this.validationForm.controls; }

  formSubmit() {
    this.submitted = true;
    if (this.validationForm.invalid) {
      return;
    } else {
      this.contactModel.userid =ls.get('UserId', { decrypt: true });
      this.contactModel.role =ls.get('Role', { decrypt: true });
      this.contactModel.name = ls.get('UserName', { decrypt: true });
      this.contactModel.email =ls.get('Email', { decrypt: true });
      this.contactModel.btn = 'Support';
      this.contactModel.bg_color = 'bg-info';

      this.userService.saveSupportData(this.contactModel).subscribe((res: any) => {
        if (res == 'success') {
          this.toastr.success('Your Message has been sent.', 'success', {
            timeOut: 3000,
          });
          this.contactModel = {};
          this.submitted = false;
          this.validationForm.markAsUntouched();
        }
      })
      // location.reload();

    }
  }

}
