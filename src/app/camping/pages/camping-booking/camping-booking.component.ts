import {
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Camping } from '@models/camping';
import { Router } from '@angular/router';
import { CampingService } from '@app/camping/services/camping.service';
import { BookingService } from '@app/camping/services/booking.service';
import { CAMPINGS_ROUTES, USER_ROUTES } from '@app/core/routes';
import { daysBetweenDates, formatDate } from '@utils/functions';
import { AuthService } from '@app/auth/services/auth.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-camping-booking',
  templateUrl: './camping-booking.component.html',
  styleUrls: ['./camping-booking.component.scss'],
})
export class CampingBookingComponent implements OnInit {
  @Input() id: string = '';
  camping: Camping | null = null;
  bookingData: any = null;
  manager: any = {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
  }
  loading: boolean = true;
  creatingBooking: boolean = false;

  private campingService = inject(CampingService);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  protected formatDate = formatDate;
  protected daysBetweenDates = daysBetweenDates;

  async ngOnInit(): Promise<void> {
    try {
      this.camping = await this.campingService.getCamping(this.id);
      this.bookingData = await this.bookingService.getBookingData(this.id);
      this.manager = {
        email: this.authService.user.email,
        firstname: this.authService.user.attributes.firstname,
        lastname: this.authService.user.attributes.lastname,
        phone: this.authService.user.attributes.phone,
      }
      this.loading = false;
    } catch {
      this.router.navigateByUrl(CAMPINGS_ROUTES.setCamping(this.id));
    }
  }

  async createBooking() {
    this.creatingBooking = true;
    try {
      await this.campingService.createCampingBooking(this.camping._id, {
        ...this.bookingData,
        manager: this.manager,
        paymentMethod: "VISA",
        status: "pending",
      });
      await this.dialogService.open('success', this.translate.instant('campsite.bookedSuccessfully'));
      this.router.navigateByUrl(USER_ROUTES.BOOKINGS.url)
    } catch {

    }
    this.creatingBooking = false;
  }
}
