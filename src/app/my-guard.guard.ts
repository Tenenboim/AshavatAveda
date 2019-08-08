import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  roleId:number;
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     this.roleId=+localStorage.getItem("RoleId");
    //  switch (next.routeConfig.path){
    //    case 'every-one-options':
    //      if(this.roleId!=3)
    //      {
    //        this.router.navigate(['']);
    //        return false;
    //      }
    //  }
    return true;
  }
}
