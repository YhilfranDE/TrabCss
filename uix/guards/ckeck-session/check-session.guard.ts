import * as core from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../../services/security/security.service';

@core.Injectable({
  providedIn: 'root'
})

export class CheckSessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var sessionId = localStorage.getItem('sessionId');
    if (sessionId != null) {
      this.securityService.checkSession(sessionId)
        .subscribe((result: any) => {
          return true;
        }, err => {
          localStorage.removeItem("sessionId");
          localStorage.removeItem("token");
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          var errorMessage = jsonObject.message;
          this.router.navigate(['Login', errorMessage])
        });
      return true;
    } else {
      var errorMessage = 'Su sesion ha expirado. Vuelva a ingresar.';
      this.router.navigate(['Login', errorMessage]);
      return false;
    }
  }

}