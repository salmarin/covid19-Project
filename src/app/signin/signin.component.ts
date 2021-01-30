import { Component, OnInit } from '@angular/core';
import { CovidService } from '../Covid.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public covidService: CovidService) { }

  ngOnInit(): void {
  }

}
