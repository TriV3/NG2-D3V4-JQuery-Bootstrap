import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../../shared/graph-creator.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-creator-tools',
  templateUrl: './graph-tools.component.html',
  styleUrls: ['./graph-tools.component.css']
})
export class CreatorToolsComponent implements OnInit {

  constructor(private CS: CreatorService) { }

  ngOnInit() {

  }

}
