import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { CreatorService } from '../../../shared/graph-creator.service';

@Component({
    selector: 'app-creator-properties',
    templateUrl: './graph-properties.component.html',
    styleUrls: ['./graph-properties.component.css'],
})
export class CreatorPropertiesComponent implements OnInit, OnChanges {
    private size: number = 400;

    constructor(private CS: CreatorService) { }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.size = this.CS.canvasHeight;
    }

}
