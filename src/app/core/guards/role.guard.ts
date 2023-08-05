import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

export const allowedRole = (role: string): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (role  !== authService.user.role) {
    router.navigate([authService.user.role]);
  }
  return role  === authService.user.role;
}

export const canExit = async (component:any): Promise<Boolean> => {
  if (component.haveChanges) {
    const dialogService = inject(DialogService);
    const translate = inject(TranslateService);
    const confirmMessage = translate.instant('common.unsavedChanges')
    const confirmed = await dialogService.open('confirmDanger', confirmMessage);
    if (confirmed) {
      component.haveChanges = false;
    }
    return confirmed;
  }
  return true;
}
