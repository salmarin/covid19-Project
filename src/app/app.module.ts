import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort'; 


import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import {Sort} from '@angular/material/sort';

import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { HttpClientModule }   from '@angular/common/http';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddnewsComponent } from './addnews/addnews.component';
import { CountrypageComponent } from './countrypage/countrypage.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';

@NgModule({
  declarations: [
    
    AppComponent,
    SigninComponent,
    HomepageComponent,
    AddnewsComponent,
    CountrypageComponent,
    AccessdeniedComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    MatSortModule,
    BrowserAnimationsModule,
    
    

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
