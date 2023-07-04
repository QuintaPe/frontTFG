import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})

export class UserBookingsComponent implements OnInit {
  columns:any = []
  translate = inject(TranslateService);
  userService = inject(UserService);
  authService = inject(AuthService);

  ngOnInit(): void {
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
