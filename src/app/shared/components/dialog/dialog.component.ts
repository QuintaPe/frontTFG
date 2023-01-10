import { Component, Input, OnInit, Type } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() my_modal_title?:String;
  @Input() my_modal_content?:String;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
  

}