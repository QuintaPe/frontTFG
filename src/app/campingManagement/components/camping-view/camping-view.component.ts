import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampingService } from '@app/user/services/camping.service';
import { Camping } from '@models/camping';

@Component({
  selector: 'app-camping-view',
  templateUrl: './camping-view.component.html',
  styleUrls: ['./camping-view.component.scss']
})
export class CampingViewComponent implements OnInit {
  camping: Camping | null = null;

  constructor(
    private activatedroute: ActivatedRoute,
    private campingService: CampingService,
  ) {}
  async ngOnInit(): Promise<void> {
    const id = this.activatedroute.snapshot.paramMap.get("id") ?? '';
    this.camping = await this.campingService.getCamping(id);
    console.log(this.camping);
  }

}
