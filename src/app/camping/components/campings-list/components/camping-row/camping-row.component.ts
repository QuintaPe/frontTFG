import { Input, Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CampingService } from '@app/camping/services/camping.service';
import environment from 'src/environments/environment';

@Component({
  selector: 'app-camping-row',
  templateUrl: './camping-row.component.html',
  styleUrls: ['./camping-row.component.scss']
})
export class CampingRowComponent implements OnInit{
  @Input() _id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() images: any = [];
  @Input() createdAt = '';
  @Input() loading = false;
  @Input() relation:any = {};
  @Output() onChange = new EventEmitter();

  protected image = ''
  private campingService = inject(CampingService);


  ngOnInit() {
    if (this.images.length) {
      this.image = environment.api.FILES_BASE_URL + this.images[0];
    }
  }

  async toggleFavorite(e: any) {
    e.stopPropagation();
    const favorite = !this.relation?.favorite;
    this.relation = await this.campingService.createCampingRelation(this._id, { favorite })
  }
}
