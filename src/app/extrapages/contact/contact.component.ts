import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  tooltipvalidationform!: FormGroup;
  formsubmit!: boolean;

  longitude = 20.728218;
  latitude = 52.128973;
  markers: any;
  zoom: number = 15;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader
    ) { }


  ngOnInit(): void {
    this.tooltipvalidationform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      subject: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      message: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ,/;." ]{1,32}')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      
    });
    
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const center = { lat: this.latitude, lng: this.longitude };
      });
    }
  }
  formSubmit() {
    this.formsubmit = true;
  }
  get formData() {
    return this.tooltipvalidationform.controls;
  }

}
