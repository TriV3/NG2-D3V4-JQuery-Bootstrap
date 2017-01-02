import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../shared/graph-creator.service';

@Component({
  selector: 'app-graph-creator',
  templateUrl: './graph-creator.component.html',
  styleUrls: ['./graph-creator.component.css']
})
export class CreatorComponent implements OnInit {

  constructor(private CS: CreatorService) { }

  ngOnInit() {
  }

}
