import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {CovidService} from '../Covid.service';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartPoint} from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { News } from '../news.model';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: User;
  global_data: any;
  global_rows: any;
  pieChartOptions: ChartOptions = {responsive: true,};
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins: any = [];
  pieChartReady = false;
  countries_data: any;
  today= new Date();
  Globalnews: News[];
  sortedData: any;
  mortality_rate: any;
  recovery_rate: any;
  active_cases: any;

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
  lineData: any;
  lineChartLegend = true;
  lineChartPlugins: any = [];
  lineChartType: ChartType = 'line';
  chartData: any;
  barData: any;
  var1: any[] =[];
  var2: any[]=[];
  var3: any[]=[];
  var0: string[];
  
  
  constructor(public homepageService: CovidService ) {
    

   }


   

  ngOnInit(): void {

    this.homepageService.getNews('Worldwide')
    .subscribe((news: any)=> {
      this.Globalnews = news;
    })

    this.user = this.homepageService.getUser();
    this.homepageService.getLastData().subscribe((res3: any)=>{

    this.homepageService.getGlobalData().subscribe((res2: any)=> {

    this.homepageService.getData().subscribe((res: any)=> { 
    this.global_data = res["Global"];
    this.pieChart();
    this.pieChartReady = true;
    this.countries_data=res["Countries"];
    this.global_rows = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths", "NewRecovered", "TotalRecovered"];
    this.sortedData= this.countries_data.slice();
    this.mortality_rate= this.global_data["TotalDeaths"]/this.global_data["TotalConfirmed"];
    this.active_cases= this.global_data["TotalConfirmed"]-this.global_data["TotalRecovered"];
    this.recovery_rate= this.global_data["TotalRecovered"]/this.global_data["TotalConfirmed"];
    
    this.lineData= res2;
    this.lineChart();
    this.barData= res3;

    this.barChart();
 
  

    this.pieChartReady=true;
      });
  });
});

    
  }
  sortData(sort: Sort) {
    const data = this.countries_data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a:any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Country': return this.compare(a["Country"], b["Country"], isAsc);
        case 'NewConfirmed': return this.compare(a["NewConfirmed"], b["NewConfirmed"], isAsc);
        case 'TotalConfirmed': return this.compare(a["TotalConfirmed"], b["TotalConfirmed"], isAsc);
        case 'NewDeaths': return this.compare(a["NewDeaths"], b["NewDeaths"], isAsc);
        case 'TotalDeaths': return this.compare(a["TotalDeaths"], b["TotalDeaths"], isAsc);
        case 'NewRecovered': return this.compare(a["NewRecovered"], b["NewRecovered"], isAsc);
        case 'TotalRecovered': return this.compare(a["TotalRecovered"], b["TotalRecovered"], isAsc);

        default: return 0;
      }
    });
  }


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  pieChart(){
    this.pieChartLabels=[["TotalConfirmed"], ["TotalRecovered"], ["TotalDeaths"]];
    this.pieChartData=[this.global_data["TotalConfirmed"], this.global_data["TotalRecovered"], this.global_data["TotalDeaths"]];
  }
  lineChart(){
    /** for (let i in this.country_data) {
       if ('04/13/2020' == this.datepipe.transform(this.country_data[i]["Date"],'MM/dd/YYYY')) {
         this.april_thirteenth = i;}
       } */
     
       
       this.lineDeathData=Object.values(this.lineData["deaths"]);
       this.lineRecoveredData=Object.values(this.lineData["recovered"]);
       this.lineNewData=Object.values(this.lineData["cases"]);
       this.lineChartLabels=Object.keys(this.lineData["deaths"]);
       
 
 
     this.lineChartData=[
       {data: this.lineNewData, label: ' New Cases'},
       {data: this.lineRecoveredData, label: ' Recovered'},
       {data: this.lineDeathData, label: ' Deaths'}];  }
  

    barChart(){
      this.var0=Object.keys(this.barData["deaths"]);
      this.barChartLabels=this.var0.slice(1);
  
      
      for (var day of [0,1,2,3,4,5,6,7]){
        this.var1.push(Object.values(this.barData["cases"])[day]);
        this.var2.push(Object.values(this.barData["recovered"])[day]);
        this.var3.push(Object.values(this.barData["deaths"])[day]);}
  
      for (var day of [1,2,3,4,5,6,7]){
        this.barDeathData.push(this.var3[day]-this.var3[day-1])
        this.barRecoveredData.push(this.var2[day]-this.var2[day-1])
        this.barNewData.push(this.var1[day]-this.var1[day-1])
      }
          
    
        this.barChartData=[
          {data: this.barNewData, label: 'Daily New Cases'} ,
          {data: this.barRecoveredData, label: 'Daily Recovered'},
          {data: this.barNewData, label: 'Daily New Cases'} 
        ];
    this.barChartReady = true;

    

  }


  

}
