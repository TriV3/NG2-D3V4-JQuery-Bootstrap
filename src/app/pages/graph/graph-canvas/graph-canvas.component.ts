import { Component, OnInit, OnChanges, ElementRef, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { CreatorService } from '../../../shared/graph-creator.service';
import { Circle, Shape, Square, Triangle } from '../../../shared/models/shape';
import * as d3 from 'd3';

@Component({
    selector: 'app-creator-canvas',
    templateUrl: './graph-canvas.component.html',
    styleUrls: ['./graph-canvas.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreatorCanvasComponent implements OnInit, OnChanges {

    @ViewChild('archiCreator') private chartContainer: ElementRef;

    private margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    private hasMoved: boolean = false;
    private width: number;
    private height: number;

    private svg: any;
    private tooltip: any;
    private canvas: any;
    private container: any;

    private circlesGroup;
    private trianglesGroup;
    private squaresGroup;

    private picSize = 20;
    private picBigSize = 30;

    private canvasCoordinate = [0, 0];
    private canvasScale = 1;


    constructor(private el: ElementRef, private CS: CreatorService) {
    }

    ngOnInit() {
        this.createGraph();
        this.DrawGraph();
    }

    createGraph() {
        let that = this;
        let element = this.chartContainer.nativeElement;

        this.width = +d3.select(element).style('width').replace('px', '');
        this.height = +this.width * 9 / 26;

        // this.height = +this.width * 9 / 35;
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.height - this.margin.top - this.margin.bottom;

        // Define the div for the tooltip
        this.tooltip = d3.select(element).append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        this.svg = d3.select(element)
            .append('div')
            .classed('svg-container', true)
            .append('svg')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('role', 'img')
            .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
            .classed('svg-content-responsive', true)
            .call(d3.zoom()
                .scaleExtent([1, 10])
                .on('zoom', function () { that.Zoomed(this, that); }))
            .on('dblclick.zoom', null);




        this.canvas = this.svg.append('rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('type', 'canvas')
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .attr('class', 'canvas')
            .on('click', function () { that.CanvasClick(this, that); });



        this.container = this.svg.append('g');

        // Draw items from bottom to top view
        // Vertical grid lines
        this.container.append('g')
            .attr('class', 'grid')
            .selectAll('line')
            .data(d3.range(0, this.width, 10))
            .enter().append('line')
            .attr('x1', (d) => {
                return d;
            })
            .attr('y1', 0)
            .attr('x2', (d) => {
                return d;
            })
            .attr('y2', this.height);

        // Horizontal grid lines
        this.container.append('g')
            .attr('class', 'grid')
            .selectAll('line')
            .data(d3.range(0, this.height, 10))
            .enter().append('line')
            .attr('x1', 0)
            .attr('y1', function (d) {
                return d;
            })
            .attr('x2', this.width)
            .attr('y2', function (d) {
                return d;
            });

        // All equipments groups
        this.circlesGroup = this.container.append('g');
        this.squaresGroup = this.container.append('g');
        this.trianglesGroup = this.container.append('g');

    }


    DrawGraph() {
        let that = this;
        let element = this.chartContainer.nativeElement;

        this.width = +d3.select(element).style('width').replace('px', '');
        this.height = +this.width * 9 / 26;
        // this.height = +this.width * 9 / 35;
        this.CS.canvasHeight = this.height;
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.height - this.margin.top - this.margin.bottom;


        // Draw circles
        this.circlesGroup.selectAll('image').remove();
        let circles = this.circlesGroup
            .attr('class', 'dot')
            .selectAll('image')
            .data(this.CS.shapes.circles)
            .enter()
            .append('svg:image')
            .on('click', function () { that.CircleClick(this, that); });

        circles
            .attr('name', (d) => { return d.name; })
            .attr('type', 'station')
            .attr('x', (d) => { return d.x; })
            .attr('y', (d) => { return d.y; })
            .attr('width', this.picSize + 'px')
            .attr('height', this.picSize + 'px')
            .attr('xlink:href', '../../../../assets/images/Circle.png')
            .on('mouseover', function (d, i) { that.HandleMouseOver(d, i, this, that); })
            .on('mouseout', function (d, i) { that.HandleMouseOut(d, i, this, that); })
            .call(d3.drag()
                .subject((d) => { return d; })
                .on('start', function (d) { that.DragStarted(d, this, that); })
                .on('drag', function (d) { that.Dragged(d, this, that); })
                .on('end', function (d) { that.DragEnded(d, this, that); }));

        // Draw squares
        this.squaresGroup.selectAll('image').remove();
        let squares = this.squaresGroup
            .attr('class', 'dot')
            .selectAll('image')
            .data(this.CS.shapes.squares)
            .enter()
            .append('svg:image')
            .on('click', function () { that.SquareClick(this, that); });

        squares
            .attr('name', (d) => { return d.name; })
            .attr('type', 'switch')
            .attr('x', (d) => { return d.x; })
            .attr('y', (d) => { return d.y; })
            .attr('width', this.picSize + 'px')
            .attr('height', this.picSize + 'px')
            .attr('xlink:href', '../../../../assets/images/Square.png')
            .on('mouseover', function (d, i) { that.HandleMouseOver(d, i, this, that); })
            .on('mouseout', function (d, i) { that.HandleMouseOut(d, i, this, that); })
            .call(d3.drag()
                .subject((d) => { return d; })
                .on('start', function (d) { that.DragStarted(d, this, that); })
                .on('drag', function (d) { that.Dragged(d, this, that); })
                .on('end', function (d) { that.DragEnded(d, this, that); }));

        // Draw triangles
        this.trianglesGroup.selectAll('image').remove();
        let triangles = this.trianglesGroup
            .attr('class', 'dot')
            .selectAll('image')
            .data(this.CS.shapes.triangles)
            .enter()
            .append('svg:image')
            .on('click', function () { that.TriangleClick(this, that); });

        triangles
            .attr('name', (d) => { return d.name; })
            .attr('type', 'router')
            .attr('x', (d) => { return d.x; })
            .attr('y', (d) => { return d.y; })
            .attr('width', this.picSize + 'px')
            .attr('height', this.picSize + 'px')
            .attr('xlink:href', '../../../../assets/images/Triangle.png')
            .on('mouseover', function (d, i) { that.HandleMouseOver(d, i, this, that); })
            .on('mouseout', function (d, i) { that.HandleMouseOut(d, i, this, that); })
            .call(d3.drag()
                .subject((d) => { return d; })
                .on('start', function (d) { that.DragStarted(d, this, that); })
                .on('drag', function (d) { that.Dragged(d, this, that); })
                .on('end', function (d) { that.DragEnded(d, this, that); }));
    }

    ngOnChanges() {
        this.DrawGraph();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.DrawGraph();
    }


    Zoomed(_this, that) {
        if (that.CS.informations.selectedMode === 'zoom') {
            that.canvasScale = d3.event.transform.k;
            that.canvasCoordinate[0] = d3.event.transform.x;
            that.canvasCoordinate[1] = d3.event.transform.y;
            this.container.attr('transform', d3.event.transform);
        }
    }

    // Create Event Handlers for mouse
    HandleMouseOver(d, i, _this, that) {
        // Get shape object and type
        let object = d3.select(_this);
        let type = String(object.attr('type'));

        // // Resize equipment with picBigSize value
        let offset = (that.picBigSize - that.picSize) / 2;
        object
            .attr('height', that.picBigSize)
            .attr('width', that.picBigSize)
            .attr('x', d.x - offset)
            .attr('y', d.y - offset);
        // Set the global selected equipment
        that.CS.selectedObject = new Shape(type, d.id, d.name);

        // Set equipment name tooltip
        that.tooltip.transition()
            .duration(400)
            .style('opacity', .9);
        that.tooltip
            .html(() => {
                let f1 = 'style="font-size: ' + (11 + (that.canvasScale * 2)) + 'px; text-transform: uppercase;"';
                let f2 = 'style="font-size: ' + (10 + (that.canvasScale * 2)) + 'px;"';
                let code: string = '<span ' + f1 + '><b>' + (d.type) + '</b></span>';
                code += '<br/><span ' + f2 + '>' + d.name + '</span>';
                return code;
            })
            .style('left', (that.RelativeCoordinate([d.x, d.y])[0]) + 'px')
            .style('top', (that.RelativeCoordinate([d.x, d.y])[1]) + 'px');
    }

    HandleMouseOut(d, i, _this, that) {
        // Get equipment object
        let object = d3.select(_this);

        // Resize equipment with normal size
        let offset = (that.picBigSize - that.picSize) / 2;
        if (that.hasMoved) {
            object
                .attr('height', that.picSize)
                .attr('width', that.picSize)
                .attr('x', d.x + offset)
                .attr('y', d.y + offset);
        } else {
            object
                .attr('height', that.picSize)
                .attr('width', that.picSize)
                .attr('x', d.x)
                .attr('y', d.y);
        }
        // Reset the global selected equipment
        that.CS.selectedObject = new Shape('', -1, '');
        that.hasMoved = false;
        // Reset equipment name tooltip
        that.tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }

    DragStarted(d, _this, that) {

        if (that.CS.informations.selectedMode === 'move') {
            that.hasMoved = true;
            d3.event.sourceEvent.stopPropagation();
            d3.select(_this).classed('dragging', true);
        }

    }

    Dragged(d, _this, that) {
        if (that.CS.informations.selectedMode === 'move') {
            // let type = String(d3.select(_this).attr('type'));
            let offset = (that.picBigSize - that.picSize) / 2;

            d3.select(_this)
                .attr('x', d.x = Math.max(d3.event.x - offset, 0))
                .attr('y', d.y = Math.max(d3.event.y - offset, 0));

            this.DrawGraph();
        }
    }

    DragEnded(d, _this, that) {
        d3.select(_this).classed('dragging', false);
    }


    RelativeCoordinate(d) {
        let coord = [0, 0];
        coord[0] = d[0] * this.canvasScale + this.canvasCoordinate[0];
        coord[1] = d[1] * this.canvasScale + this.canvasCoordinate[1];
        return coord;
    }

    AbsoluteCoordinate(d): [number, number] {
        let coord: [number, number] = [0, 0];
        coord[0] = (d[0] - this.canvasCoordinate[0]) / this.canvasScale;
        coord[1] = (d[1] - this.canvasCoordinate[1]) / this.canvasScale;
        return coord;
    }

    CircleClick(_this, that) {
        that.CS.setSelected(that.CS.selectedObject);

        if (that.CS.informations.selectedMode === 'delete') {
            let shape = that.CS.findCircleFromName(that.CS.selectedObject.name);

            if (that.CS.removeShape(shape)) {
                that.CS.informations.notification = 'Circle ' + shape.name + ' deleted';
                that.DrawGraph();
                that.CS.selectedObject.type = '';
                that.CS.setSelected(null);
            } else {
                that.CS.informations.notification = 'Circle ' + shape.name + ' not deleted';
            }
        }
    }

    SquareClick(_this, that) {
        that.CS.setSelected(that.CS.selectedObject);

        if (that.CS.informations.selectedMode === 'delete') {
            let shape = that.CS.findSquareFromName(that.CS.selectedObject.name);

            if (that.CS.removeShape(shape)) {
                that.CS.informations.notification = 'Square ' + that.CS.selectedObject.name + ' deleted';
                that.DrawGraph();
                that.CS.selectedObject.type = '';
                that.CS.setSelected(null);
            } else {
                that.CS.informations.notification = 'Square ' + shape.name + ' not deleted';
            }
        }
    }

    TriangleClick(_this, that) {
        that.CS.setSelected(that.CS.selectedObject);

        if (that.CS.informations.selectedMode === 'delete') {
            let shape = that.CS.findTriangleFromName(that.CS.selectedObject.name);

            if (that.CS.removeShape(shape)) {
                that.CS.informations.notification = 'Triangle ' + that.CS.selectedObject.name + ' deleted';
                that.DrawGraph();
                that.CS.selectedObject.type = '';
                that.CS.setSelected(null);
            } else {
                that.CS.informations.notification = 'Triangle ' + shape.name + ' not deleted';
            }
        }
    }

    CanvasClick(_this, that) {
        let canvas: any = d3.select('.canvas').node();
        let position = d3.mouse(canvas);
        position = that.AbsoluteCoordinate(position);
        position[0] = Math.round(position[0]);
        position[1] = Math.round(position[1]);

        let offset = (that.picBigSize - that.picSize) / 2;

        switch (that.CS.informations.selectedMode) {

            case 'Circle':
                let circle = new Shape('Circle',
                    that.CS.shapes.circles.length,
                    'Circle_' + (+that.CS.shapes.circles.length + 1),
                    position[0] - offset,
                    position[1] - offset);

                that.CS.addCircle(circle);
                that.CS.log('"Circle" created at position ' + position);
                break;
            case 'Square':
                let square = new Shape('Square',
                    +that.CS.shapes.squares.length,
                    'Square_' + (+that.CS.shapes.squares.length + 1),
                    position[0] - offset,
                    position[1] - offset);

                that.CS.addSquare(square);
                that.CS.log('"Square" created at position ' + position);
                break;
            case 'Triangle':
                let triangle = new Shape('Triangle',
                    +that.CS.shapes.triangles.length,
                    'Triangle_' + (+that.CS.shapes.triangles.length + 1),
                    position[0] - offset,
                    position[1] - offset);

                that.CS.addTriangle(triangle);
                that.CS.log('"Triangle" created at position ' + position);
                break;

            default:
                break;
        }
        that.DrawGraph();
        that.CS.setSelected(null);
        d3.event.stopPropagation();
    }

}
