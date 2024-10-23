import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authAdminGuard: CanActivateChildFn = (route, state) => {

  const token = inject(AuthService).Token
  const router = inject(Router)

  if(token) {
    return true;
  }

  router.navigate(["/admin/page/login"])
  return false;
};
