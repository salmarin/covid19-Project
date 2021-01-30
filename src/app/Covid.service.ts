import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { HttpClient }   from '@angular/common/http';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import  {User} from './user.model';
import { Router } from '@angular/router';
import { Country } from './country.model';
import { DatePipe } from '@angular/common';
import { News } from './news.model';


@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private user: User;
  private today= new Date();
  private country: Country;
  private data: any;
  private firestore_status: boolean = false;
  data_index: string;
  constructor(private afAuth: AngularFireAuth, public datepipe: DatePipe,
    private router: Router, public firestore : AngularFirestore,private http: HttpClient ) { } 

  async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user={
      uid: credentials.user.uid,
      displayName: credentials.user.displayName,
      email: credentials.user.email,
    }; 
    localStorage.setItem("user", JSON.stringify(this.user));
    this.updateUserData();
    this.router.navigate(["homepage"])
    }  
    
  private updateUserData(){
    this.firestore.collection("users").doc(this.user.uid).set({
      uid: this.user.uid,
      displayName: this.user.displayName,
      email: this.user.email
    }, {merge: true});

  }
  getUser(){
    if(this.user ==null && this.userSignedIn()){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    return this.user;

  }
  userSignedIn( ): boolean{
    return JSON.parse(localStorage.getItem("user")) != null;
  }

  isLegible(user: User) {
    this.firestore.collection('legibleUsers').doc(user.email).get().subscribe((doc)=> {
      if (doc.exists){ return true; }
      return false;
    });

  }

  toaddnews(){
    this.router.navigate(["addnews"]);
  }
  toHomepage(){
    this.router.navigate(["homepage"]);
  }
  toSignin(){
    this.router.navigate(["signin"]);

  }
  toAccessdenied(){
    this.router.navigate(["accessdenied"]);

  }

  signOut(){
    this.afAuth.signOut();
    localStorage.removeItem("user");
    this.user = null;
    this.router.navigate(["signin"]);
  }


  getTotal(){
    return this.firestore.collection("users").doc(this.user.uid)
    .collection("total").doc("deaths").valueChanges();
  }
  public getData(){
    return this.http.get<JSON>("https://api.covid19api.com/summary");
  }

  public getCountryData(slug: string){
    return this.http.get<JSON>("https://api.covid19api.com/dayone/country/"+slug);
  }

  public getGlobalData(){
    return this.http.get<JSON>("https://corona.lmao.ninja/v2/historical/all");
  }
  public getLastData(){
   return this.http.get<JSON>("https://corona.lmao.ninja/v2/historical/all?lastdays=8");
  }



  gotocountry(country: any){
    this.router.navigate(["countrypage/"+country["Slug"]]); 
       
  }

  getCountry(){
    return this.country;
    
  }




  /** updateURLcountry(country_slug: string){
     this.firestore.collection("countries").doc(country_slug[0].toLocaleUpperCase()+country_slug.slice(1))
     .get().subscribe((doc: any)=> { 
       if(doc.exists){

      if (this.datepipe.transform(doc.data()["date"],'MM/dd/YYYY') == this.datepipe.transform(this.today,'MM/dd/YYYY') ){
        this.firestore_status = true;
        console.log('IM IN THE IFFFFFFF')
        this.country={
          country: doc.data()["country"],
          countryCode: doc.data()["countryCode"],
          slug:doc.data()["slug"],
          newConfirmed: doc.data()["newConfirmed"],
          totalConfirmed: doc.data()["totalConfirmed"],
          newDeaths: doc.data()["newDeaths"],
          totalDeaths: doc.data()["totalDeaths"],
          newRecovered: doc.data()["newRecovered"],
          totalRecovered: doc.data()["totalRecovered"],
          date: this.datepipe.transform(doc.data()["date"],'MM/dd/YYYY')
        };
        console.log(this.country)
      }
        
        else{this.firestore_status = false; }
      }

      else{this.firestore_status = false;}
    })

      if(this.firestore_status == false){

        this.getData().subscribe((res)=> { 
          this.data=res;
          console.log(this.data);
          for(var i in this.data){
            console.log(i);
            if(this.data["Countries"][i]["Slug"]= country_slug){
              this.data_index=i;}}

          this.firestore.collection("countries").doc(country_slug[0].toLocaleUpperCase()+country_slug.slice(1)).set({
            newConfirmed:  this.data["Countries"][this.data_index]["NewConfirmed"],
            totalConfirmed: this.data["Countries"][this.data_index]["TotalConfirmed"],
            newDeaths: this.data["Countries"][this.data_index]["NewDeaths"],
            totalDeaths: this.data["Countries"][this.data_index]["TotalDeaths"],
            newRecovered: this.data["Countries"][this.data_index]["NewRecovered"],
            totalRecovered: this.data["Countries"][this.data_index]["TotalRecovered"],
            date: this.datepipe.transform(this.today,'MM/dd/YYYY'),}, {merge: true});
        
            this.country={
            country: this.data["Countries"][this.data_index]["NewConfirmed"],
            countryCode: this.data["Countries"][this.data_index]["NewConfirmed"],
            slug: country_slug,
            newConfirmed: this.data["Countries"][this.data_index]["NewConfirmed"],
            totalConfirmed: this.data["Countries"][this.data_index]["TotalConfirmed"],
            newDeaths: this.data["Countries"][this.data_index]["NewDeaths"],
            totalDeaths:  this.data["Countries"][this.data_index]["TotalDeaths"],
            newRecovered: this.data["Countries"][this.data_index]["NewRecovered"],
            totalRecovered: this.data["Countries"][this.data_index]["TotalRecovered"],
            date: this.datepipe.transform(this.today,'MM/dd/YYYY')};
      
      
        })        

      }


  } */

  addNews(news: News){
    this.firestore.collection("countries").doc(news.country[0].toLocaleUpperCase() + news.country.slice(1)).collection("news").add(news);
  
}

getNews(slug: string){
  return this.firestore.collection("countries").doc(slug[0].toLocaleUpperCase() + slug.slice(1))
    .collection("news").valueChanges();
}


}

