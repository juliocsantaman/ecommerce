import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.getSession()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
  
};
