import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { User } from '../auth/interfaces/interfaces';
import { of } from 'rxjs';

export const validarAdminGuard: CanActivateFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // debugger;
  // ver si  no existe,si no existe recuperarlo
  if (!authService.usuario || !authService.usuario.authorities) {
    const user: User = JSON.parse(Cookie.get('user'));

    authService.setAuthenticatedUser(user);
    console.log('USERGUARD', authService.usuario);
  } else {
    if (
      !authService.usuario.authorities.find((p) => p.authority == 'ROLE_ADMIN')
    ) {
      router.navigateByUrl('/login');
      return of(false);
    }
  }

  return of(true);
};
