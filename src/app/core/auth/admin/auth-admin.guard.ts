import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateChildFn = (route, state) => {

  const sessionStorage = inject(DOCUMENT).defaultView?.sessionStorage as Storage
  const token = sessionStorage.getItem("token")
  const router = inject(Router)

  if(token) {
    return true;
  }

  router.navigate(["/admin/login"])
  return false;
};
