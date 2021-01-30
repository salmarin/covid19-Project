import { Component, OnInit } from '@angular/core';
import { Country } from '../country.model';
import { CovidService } from '../Covid.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { News } from '../news.model';



@Component({
  selector: 'app-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {
  date = new Date();

  country: Country;
  pieChartOptions: ChartOptions = {responsive: true,};
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins: any = [];
  pieChartReady = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [ ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins: any = [];
  barChartData: ChartDataSets[] = [ ];
  barChartReady: boolean = false;

  barDeathData: Array<any> =[];
  barRecoveredData: Array<any>=[];
  barNewData: Array<any> = [];

  lineDeathData: Array<any> =[];
  lineRecoveredData: Array<any>=[];
  lineNewData: Array<any> = [];

 
  lineChartData: ChartDataSets[];
 
  lineChartLabels: Label[]= [];
 
  lineChartOptions = {responsive: true,};
 
  lineChartLegend = true;
  lineChartPlugins: any = [];
  lineChartType: ChartType = 'line';

  private firestore_status: boolean=false;
  april_thirteenth:any;
  country_data: any;
  data: any;
  longueur: any;
  days: any;
  country_slug: string;
  data_index: any;
  private today= new Date();
  news: News[];
  news_ready:boolean=false;

  AllDataReady: boolean=false;
  mortality_rate: number;
  active_cases: number;
  recovery_rate: number;

  constructor(private actRoute: ActivatedRoute, public countrypageService: CovidService, public datepipe: DatePipe) { 
    this.country_slug= this.actRoute.snapshot.params.slug;

  }
 

  ngOnInit(): void {

    this.countrypageService.getNews(this.country_slug)
    .subscribe((news: any)=> {
      this.news = news;
      this.news_ready=true;
    })



    this.countrypageService.firestore.collection("countries").doc(this.country_slug[0].toLocaleUpperCase()+this.country_slug.slice(1))
     .get().subscribe((doc: any)=> {

      if(doc.exists){

     if (this.datepipe.transform(doc.data()["date"],'MM/dd/YYYY') == this.datepipe.transform(this.today,'MM/dd/YYYY') ){
       this.firestore_status = true;
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
         mortalityRate: doc.data()["mortalityRate"],
         activeCases: doc.data()["activeCases"],
         recoveryRate: doc.data()["recoveryRate"],

         date: this.datepipe.transform(doc.data()["date"],'MM/dd/YYYY')
       };
     }
       
       else{this.firestore_status = false; }
     }

     else{this.firestore_status = false;}
   

     if(this.firestore_status == false){

       this.countrypageService.getData().subscribe((res: any)=> { 
         this.data=res["Countries"];
         for(var i in this.data){
           if(this.data[i]["Slug"]== this.country_slug){
             this.data_index=i;}}

         this.countrypageService.firestore.collection("countries").doc(this.country_slug[0].toLocaleUpperCase()+this.country_slug.slice(1))
         .set({
           country: this.data[this.data_index]["Country"],
           countrycode: this.data[this.data_index]["CountryCode"],
           slug: this.data[this.data_index]["Slug"],
           newConfirmed:  this.data[this.data_index]["NewConfirmed"],
           totalConfirmed: this.data[this.data_index]["TotalConfirmed"],
           newDeaths: this.data[this.data_index]["NewDeaths"],
           totalDeaths: this.data[this.data_index]["TotalDeaths"],
           newRecovered: this.data[this.data_index]["NewRecovered"],
           totalRecovered: this.data[this.data_index]["TotalRecovered"],
           mortalityRate: this.data[this.data_index]["TotalDeaths"]/this.data[this.data_index]["TotalConfirmed"],
           activeCases: this.data[this.data_index]["TotalConfirmed"]-this.data[this.data_index]["TotalRecovered"],
           recoveryRate: this.data[this.data_index]["TotalRecovered"]/this.data[this.data_index]["TotalConfirmed"],

           date: this.datepipe.transform(this.today,'MM/dd/YYYY'),}, {merge: true});
       
           this.country={
           country: this.data[this.data_index]["Country"],
           countryCode: this.data[this.data_index]["CountryCode"],
           slug: this.country_slug,
           newConfirmed: this.data[this.data_index]["NewConfirmed"],
           totalConfirmed: this.data[this.data_index]["TotalConfirmed"],
           newDeaths: this.data[this.data_index]["NewDeaths"],
           totalDeaths:  this.data[this.data_index]["TotalDeaths"],
           newRecovered: this.data[this.data_index]["NewRecovered"],
           totalRecovered: this.data[this.data_index]["TotalRecovered"],
           mortalityRate: this.data[this.data_index]["TotalDeaths"]/this.data[this.data_index]["TotalConfirmed"],
           activeCases: this.data[this.data_index]["TotalConfirmed"]-this.data[this.data_index]["TotalRecovered"],
           recoveryRate: this.data[this.data_index]["TotalRecovered"]/this.data[this.data_index]["TotalConfirmed"],

           date: this.datepipe.transform(this.today,'MM/dd/YYYY')} 
       
       
           this.countrypageService.getCountryData(this.country_slug).subscribe((res: any)=> { 
             this.country_data = res;
             this.longueur=res.length;  
             this.days= [this.longueur-1, this.longueur-2,this.longueur-3,this.longueur-4,this.longueur-5,this.longueur-6,this.longueur-7];
             this.barChart();
             this.lineChart();
             this.pieChart();
             this.AllDataReady=true;
       
             });
       
       
          });



      }
     
    // this.countrypageService.updateURLcountry(this.country_slug);
      if (this.firestore_status== true){
        // this.country=this.countrypageService.getCountry();
        this.countrypageService.getCountryData(this.country_slug).subscribe((res: any)=> { 
          this.country_data = res;
          this.longueur=res.length;  
          this.days= [this.longueur-1, this.longueur-2,this.longueur-3,this.longueur-4,this.longueur-5,this.longueur-6,this.longueur-7];
          this.barChart();
          this.lineChart();
          this.pieChart();
          this.AllDataReady=true;      
          });

      }

    
    });
  }
  barChart(){
    for (var day of this.days){
      
    this.barDeathData.push(this.country_data[day]["Deaths"]-this.country_data[day-1]["Deaths"])
    this.barRecoveredData.push(this.country_data[day]["Recovered"]-this.country_data[day-1]["Recovered"])
    this.barNewData.push(this.country_data[day]["Confirmed"]-this.country_data[day-1]["Confirmed"])
    this.barChartLabels.push(this.datepipe.transform(this.country_data[day]["Date"],'MM/dd/YYYY'))
    }

    this.barChartData=[
      {data: this.barNewData, label: 'Daily New Cases'},
      {data: this.barRecoveredData, label: 'Daily Recovered'},
      {data: this.barDeathData, label: 'Daily Deaths'},

    ];

    this.barChartReady = true;

    

  }

  lineChart(){
   /** for (let i in this.country_data) {
      if ('04/13/2020' == this.datepipe.transform(this.country_data[i]["Date"],'MM/dd/YYYY')) {
        this.april_thirteenth = i;}
      } */
    for (var day= 0; day < this.longueur; day++ ){  
      this.lineDeathData.push(this.country_data[day]["Deaths"]);
      this.lineRecoveredData.push(this.country_data[day]["Recovered"]);
      this.lineNewData.push(this.country_data[day]["Confirmed"]);
      this.lineChartLabels.push(this.datepipe.transform(this.country_data[day]["Date"],'MM/dd/YYYY'))}
      


    this.lineChartData=[
      {data: this.lineNewData, label: ' New Cases'},
      {data: this.lineRecoveredData, label: ' Recovered'},
      {data: this.lineDeathData, label: ' Deaths'},
    ];
  }

  pieChart(){
    this.pieChartLabels=[["TotalConfirmed"], ["TotalRecovered"], ["TotalDeaths"]];
    this.pieChartData=[this.country.totalConfirmed, this.country.totalRecovered, this.country.totalDeaths];

  }


}
