import { inject, Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Camping } from '@models/camping';
import { MANAGER_ROUTES } from '@app/core/routes';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/camping/services/camping.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ErrorService } from '@app/core/services/errors.service';
import { CampingLodging } from '@app/core/models/campingLodging';

@Component({
  selector: 'app-create-camping',
  templateUrl: './create-camping.component.html',
  styleUrls: ['./create-camping.component.scss']
})

export class CreateCampingComponent implements OnInit {
  @Input() id: string = ''
  private owner = '';

  protected pages = ['info', 'location', 'lodgings', 'other']
  protected page = 0;
  protected loading = false;
  protected breadcrumb: any = [];

  private campingService = inject(CampingService);
  private router = inject(Router);
  private viewport = inject(ViewportScroller);
  protected translate = inject(TranslateService);
  protected errorService = inject(ErrorService);
  private formBuilder = inject(FormBuilder);

  firstPageForm: FormGroup;
  secondPageForm: FormGroup;
  thirdPageForm: FormArray;
  fourthPageForm: FormGroup;

  private updateBreadcrumb() {
    this.breadcrumb = [
      { name: this.translate.instant('campsite.campsites'), route: MANAGER_ROUTES.CAMPINGS.url },
      { name: this.translate.instant('campsite.createCampsite') },
      { name: this.translate.instant(`campsite.${this.pages[this.page]}`) },
    ];
  }

  ngOnInit(): void {
    this.updateBreadcrumb();
    (async () => {
      let camping = new Camping();
      if (this.id) {
        this.loading = true;
        camping = await this.campingService.getFullCamping(this.id);
        this.owner = camping.owner;
        this.loading = false;
      }

      this.firstPageForm = this.formBuilder.group({
        name: [camping.name, Validators.required],
        description: [camping.description, Validators.required],
        images: [camping.images, [Validators.required, Validators.minLength(3)]],
      });

      this.secondPageForm = this.formBuilder.group({
        street: [camping.location.street, Validators.required],
        streetNumber: [camping.location.streetNumber, Validators.required],
        locality: [camping.location.locality, Validators.required],
        community: [camping.location.community, Validators.required],
        postalCode: [camping.location.postalCode, Validators.required],
        country: [camping.location.country, Validators.required],
        city: [camping.location.city, Validators.required],
        coords: [camping.location.coords, Validators.required],
      });

      this.thirdPageForm = this.formBuilder.array(this.id ? camping.lodgings.map(lod => this.formBuilder.group({
        _id: [lod._id],
        camping: [this.id],
        type: [lod.type, Validators.required],
        name: [lod.name, Validators.required],
        feePerNight: [lod.feePerNight, Validators.required],
        size: [lod.size, Validators.required],
        capacity: [lod.capacity, Validators.required],
        units: [lod.units, Validators.required],
      })) : [])

      this.fourthPageForm = this.formBuilder.group({
        amenities: [camping.amenities, Validators.required],
        rules: [camping.rules, Validators.required],
        nearestLocations: [camping.nearestLocations, Validators.required],
      });
    })();
  }

  checkPageErrors() {
    const form = [this.firstPageForm, this.secondPageForm, null, this.fourthPageForm][this.page];

    if (form && !form.valid) {
      const invalidControlName = Object.keys(form.controls).find(control => form.controls[control].invalid);
      form.markAllAsTouched();
      console.log(form);
      if (invalidControlName) {
        const invalidControl = form.controls[invalidControlName];
        const firstError = Object.keys(invalidControl.errors)[0];
        this.errorService.setError({ name: firstError, field: this.translate.instant('campsite.' + invalidControlName) });
        return false;
      }
    }

    return true;
  }

  pageBack() {
    if (this.page > 0) {
      this.page -= 1;
      this.updateBreadcrumb();
    }
  }

  async handleSubmit() {
    if (this.checkPageErrors()) {
      if (this.page > 2) {
        this.loading = true;

        const camping = new Camping({
          _id: this.id,
          ...this.firstPageForm.value,
          ...this.fourthPageForm.value,
          location: this.secondPageForm.value,
          lodgings: this.thirdPageForm.value.map((l: any) => new CampingLodging(l)),
          owner: this.owner,
        });

        try {
          if (this.id) {
            await this.campingService.putCamping(camping);
          } else {
            await this.campingService.postCamping(camping);
          }
          this.router.navigateByUrl(MANAGER_ROUTES.CAMPINGS.url);
        } catch (err) {
          this.loading = false
          throw err;
        }
      } else {
        this.page += 1;
        this.viewport.scrollToPosition([0, 0]);
        this.updateBreadcrumb();
      }
    }
  }
}
