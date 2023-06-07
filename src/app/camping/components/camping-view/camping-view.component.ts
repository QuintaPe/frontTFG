import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from '@app/camping/services/camping.service';
import { Camping } from '@models/camping';
import { CampingLodging } from '@app/core/models/campingLodging';
import environment from 'src/environments/environment';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss'],
})
export class CampingViewComponent implements OnInit {
  camping: Camping | null = null;
  lodgings: CampingLodging[] = [];
  loading: boolean = true;

  private activatedRoute = inject(ActivatedRoute);
  private campingService = inject(CampingService);

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.camping = await this.campingService.getCamping(id);
    this.loading = false;
  }

  getImageUrl = (image: any) => {
    return image ? environment.api.FILES_BASE_URL + image._id : null;
  };

  scrollToElement(element: any): void {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
