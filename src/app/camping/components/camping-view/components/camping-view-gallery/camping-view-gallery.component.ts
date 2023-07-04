import {
  Component,
  ViewChild,
  inject,
  TemplateRef,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Gallery, GalleryItem, ImageItem, GalleryRef } from 'ng-gallery';
import environment from 'src/environments/environment';

@Component({
  selector: 'app-camping-view-gallery',
  templateUrl: './camping-view-gallery.component.html',
  styleUrls: ['./camping-view-gallery.component.scss'],
})
export class CampingViewGalleyComponent implements OnInit {
  @Input() images!: any[];

  private translate = inject(TranslateService);
  protected dialog = inject(MatDialog);
  protected gallery = inject(Gallery);

  galleryRef!: GalleryRef;
  @ViewChild('galleryTemplate') galleryTemplate!: TemplateRef<any>;

  ngOnInit() {
    this.galleryRef = this.gallery.ref('campingGallery');;
  }

  get firstImages (): string[] {
    return this.images.slice(0, 6).map(image => environment.api.FILES_BASE_URL + image._id)
  }

  get campingImages (): GalleryItem[] {
    return this.images.map(image => new ImageItem({
      src: environment.api.FILES_BASE_URL + image._id,
      thumb: environment.api.FILES_BASE_URL + image._id,
    }))
  }

  openGalleryPopup() {
    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.addLodging'),
        template: this.galleryTemplate
      },
      width: '80vw',
    });
    this.galleryRef.set(2);

  }
}
