import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const jwtToken = inject(AuthService).Token
  if(jwtToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
  }
  return next(req)
};
