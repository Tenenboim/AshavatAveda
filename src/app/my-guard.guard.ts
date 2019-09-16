import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  roleId: number = +localStorage.getItem("RoleId");
  userId: number = +localStorage.getItem("UserID");
  parameter:number=0;

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(next.url[1])
      this.parameter=Number(next.url[1].path);

      switch (next.url[0].toString()) {
      case 'every-one-options':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else return true;
          break;
        }
      case 'user-list':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else return true;
          break;
        }
      case 'add-mokdan-or-user':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else return true;
          break;
        }
      case 'category-list':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else if (this.roleId == 2) {
            this.router.navigate(['/every-one-options']);
            return false;
          }
          else return true;
          break;
        }
      case 'parameter-list':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else if (this.roleId == 2) {
            this.router.navigate(['/every-one-options']);
            return false;
          }
          else return true;
          break;
        }
      case 'edit-category':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else if (this.roleId == 2) {
            this.router.navigate(['/every-one-options']);
            return false;
          }
          else return true;
          break;
        }
      case 'add-category':
        {
          if (this.roleId == 3) {
            this.router.navigate(['/user-info', this.userId]);
            return false;
          }
          else if (this.roleId == 2) {
            this.router.navigate(['/every-one-options']);
            return false;
          }
          else return true;
          break;
        }
    }
    return true;
  }
}
