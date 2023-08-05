import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss']
})

export class AdminBookingsComponent implements OnInit {
  columns:any = []
  translate = inject(TranslateService);
  userService = inject(UserService);
  authService = inject(AuthService);

  setColumns = () => {
    this.columns = [
      {
        field: 'name',
        name: this.translate.instant('campsite.lodging'),
        sort: 'asc',
        sortable: true,
      },
      {
        field: 'capacity',
        name: this.translate.instant('campsite.capacity'),
        sort: 'asc',
        sortable: true,
        preRender: (cap: string) => cap,
      },
    ];
  }

  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  getUserBookings = async (
    page: number,
    size: number,
    search: string,
    filters: any,
    sort: string
  ) => {
    return this.userService.getUserBooking(this.authService.user._id, {
      page, size, search, filters, sort,
    })

  };
}
