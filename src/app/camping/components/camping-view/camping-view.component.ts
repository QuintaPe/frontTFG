import {
  Component,
  Input,
  OnInit,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';
import { Camping } from '@models/camping';
import environment from 'src/environments/environment';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampingViewComponent implements OnInit {
  @Input() id: string = ''
  camping: Camping | null = null;
  loading: boolean = true;

  private campingService = inject(CampingService);

  async ngOnInit(): Promise<void> {
    this.camping = await this.campingService.getCamping(this.id);
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
