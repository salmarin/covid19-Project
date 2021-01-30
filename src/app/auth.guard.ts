import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CovidService } from './Covid.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private covidService: CovidService, 
    private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.covidService.firestore.collection('legibleUsers').doc(this.covidService.getUser().email).get().subscribe((doc)=> {

        if (!doc.exists){ 
          this.router.navigate(["accessdenied"]);
        }
      });
    
      /** if(!this.covidService.userSignedIn()){
      this.router.navigate(["signin"]); } */
      return true;

  }
  
}
