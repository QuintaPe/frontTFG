import { Component, OnInit } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/user/services/camping.service';

@Component({
  selector: 'app-create-camping',
  templateUrl: './create-camping.component.html',
  styleUrls: ['./create-camping.component.scss']
})

export class CreateCampingComponent implements OnInit {
  camping: Camping = new Camping({});
  questions: { type:string, name:string, placeholder:string, value:string }[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.questions = [
      { type: 'text', name: 'Name', placeholder: 'Nombre', value: 'name' },
      { type: 'text', name: 'Description', placeholder: 'Descripcion', value: 'descption' },
      { type: 'text', name: 'Imagen', placeholder: 'Imagen', value: 'image' },
      { type: 'text', name: 'cancellationPolicy', placeholder: 'cancellationPolicy', value: 'cancellationPolicy' },
      { type: 'text', name: 'owner', placeholder: 'owner', value: 'owner' },
      { type: 'number', name: 'maximumOccupancy', placeholder: 'maximumOccupancy', value: 'maximumOccupancy' },
    ]
  }

  get haveNext() {
    return this.page * this.pageSize > this.questions.length;
  }

  get pageQuestions() {
    const lastElem = this.page * this.pageSize;
    return this.questions.slice(lastElem - this.pageSize, lastElem)
  }

  pageBack() {
    this.page -= 1;
  }

  handleSubmit() {
    if (this.haveNext) {
      this.campingService.postCamping(this.camping)
       .then(response => console.log(response))
       .catch(err => console.log(err))
    } else {
      this.page += 1;
    }
  }
}
