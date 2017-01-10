import { Component, OnInit, ElementRef } from '@angular/core';
import { CreatorService, ShapesList } from '../../../shared/graph-creator.service';

@Component({
    selector: 'app-creator-tools',
    templateUrl: './graph-tools.component.html',
    styleUrls: ['./graph-tools.component.css']
})
export class CreatorToolsComponent implements OnInit {

    el: HTMLElement;

    constructor(private CS: CreatorService, private elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
    }

    ngOnInit() {

    }

    open() {
        let that = this;
        console.log('Open Json file');
        let elem = '<input id="Load" style="display: none;" type="file" />';
        $(this.el).append(elem);
        $('#Load').val('');
        document.getElementById('Load').click();
        $('#Load').change((event) => {
            let file: File = $('#Load').prop('files')[0];
            if (!file) {
                this.CS.log('Loading Json file failed.');
                $('#Load').remove();
                console.log('Input cancel'); // Don't work
                return;
            } else {
                let reader: FileReader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    let shapesList = Object.assign(new ShapesList, JSON.parse(this.result));
                    that.CS.shapes = shapesList;
                };
            }

            $('#Load').remove();
        });

    };

    save() {
        console.log('Save JSON file');
        let data = JSON.stringify(<ShapesList>this.CS.shapes, null, 4);
        let blob = new Blob([data], {
            type: 'application/json; charset=utf-8;'
        });

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, 'architecture.json');
        } else {
            let href = 'data:application/json;charset=utf-8;,' + encodeURIComponent(data);
            $(this.el).append('<a style="display: none;" id="datadownload" href=' + href +
                ' target="_self" download="shapes.json"></a>');
            document.getElementById('datadownload').click();
            $('#datadownload').remove();
        }

    };

}
