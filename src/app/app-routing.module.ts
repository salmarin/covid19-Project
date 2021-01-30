import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent} from './signin/signin.component';
import { HomepageComponent} from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { SecurePagesGuard } from './secure-pages.guard';
import { AddnewsComponent} from './addnews/addnews.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';


const routes: Routes = [
  { path: "signin", component: SigninComponent,canActivate:[SecurePagesGuard]},
  { path: "addnews", component: AddnewsComponent,  canActivate:[AuthGuard]},
  { path: "homepage", component: HomepageComponent},
  { path: "countrypage/:slug", component: CountrypageComponent},
  { path: "accessdenied", component: AccessdeniedComponent},

  { path: "", pathMatch: "full", redirectTo: "homepage"},
  { path: "**", redirectTo: "homepage"},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
