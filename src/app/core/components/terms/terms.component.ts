import { TitleCasePipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { PanelComponent } from '@app/shared/components/panel/panel.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  standalone: true,
  imports: [PanelComponent, TranslateModule, TitleCasePipe],
  encapsulation: ViewEncapsulation.None,
})
export class TermsComponent {}
