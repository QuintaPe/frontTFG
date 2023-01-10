import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  showPopup =false

  constructor(
    public router: Router,
    public authService: AuthService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }

  navigateTo = (route: String) => {
    return this.router.navigate([route]);
  }

  logout = () => {
    console.log('a')
    this.authService.logout()
    this.router.navigate(['/login']);
  }

}
