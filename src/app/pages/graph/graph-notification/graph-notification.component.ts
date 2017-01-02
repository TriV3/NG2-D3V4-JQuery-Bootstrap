import { Component, OnInit, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { CreatorService } from '../../../shared/graph-creator.service';

@Component({
    selector: 'app-creator-notification',
    templateUrl: './graph-notification.component.html',
    styleUrls: ['./graph-notification.component.css']
})
export class CreatorNotificationComponent implements OnInit, OnChanges, OnDestroy {

    notification: string = '';
    mode: string = '';

    constructor(private CS: CreatorService) {

    }

    ngOnInit() {

    }


    ngOnChanges(): void {
        console.log('change');
    }

    ngOnDestroy(): any {
    }

}
