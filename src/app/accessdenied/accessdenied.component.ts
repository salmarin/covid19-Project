import { Component, OnInit } from '@angular/core';
import { CovidService } from '../Covid.service';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.css']
})
export class AccessdeniedComponent implements OnInit {

  constructor(public accessdeniedService: CovidService) { }

  ngOnInit(): void {
  }

}
