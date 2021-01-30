import { Component, OnInit } from '@angular/core';
import { CovidService } from '../Covid.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { News } from '../news.model';
import { User } from '../user.model';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  date: any;
  description: string;
  country: string;
  user: User;

  

  constructor(public addnewsService: CovidService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

   }

  ngOnInit(): void {

  }

  addNews(){
    let news: News ={
      date: new Date(this.date),
      description: this.description,
      country: this.country,
      user: this.addnewsService.getUser()
    }

    this.addnewsService.addNews(news);
    this.date = undefined;
    this.description = undefined;
    this.country =undefined;
    this.user= undefined;
  }
  

}
