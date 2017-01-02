import { Injectable } from '@angular/core';
import { Shape, Circle, Square, Triangle } from './models/shape';

export class ShapesList {
    triangles: Triangle[] = [];
    squares: Square[] = [];
    circles: Circle[] = [];
}

@Injectable()
export class CreatorService {

    public canvasHeight: number = 400;

    public modes = ['Square', 'Circle', 'Triangle', 'Line', 'delete', 'move', 'zoom'];

    public informations = {
        selectedMode: 'none',
        notification: 'Hello creator'
    };

    public shapes: ShapesList = new ShapesList();

    public selectedShape: Shape;
    public selectedTriangle: Triangle;
    public selectedSquare: Square;
    public selectedCircle: Circle;


    constructor() {

        this.selectedShape = new Shape('', 0, '');
        this.selectedTriangle = null;
        this.selectedSquare = null;
        this.selectedCircle = null;

        // Shapes initialized for tests purpose
        this.shapes.circles = [
            new Circle(0, 'Circle_1', 50, 200),
            new Circle(1, 'Circle_2', 250, 200),
            new Circle(2, 'Circle_3', 100, 50),
            new Circle(3, 'Circle_4', 150, 150)
        ];

        this.shapes.squares = [
            new Square(0, 'Square_1', 300, 100)
        ];

        this.shapes.triangles = [
            new Triangle(0, 'Triangle_1', 100, 100),
            new Triangle(1, 'Triangle_2', 200, 100),
            new Triangle(2, 'Triangle_3', 200, 200)
        ];
    }

    setMode(mode) {
        this.informations.selectedMode = mode;
        this.log('Mode set to "' + this.informations.selectedMode + '"');
    };


    open() {
        this.log('Open Json architecture file');
    };

    save() {
        this.log('Save architecture to Json file');
    };

    import() {
        this.log('import architecture from Excel file');
    };

    export() {
        this.log('Export architecture to Excel file');
    };

    log(message) {
        this.informations.notification = message;
    };

    addSquare(square) {
        this.shapes.squares.push(square);
        this.selectedShape.type = 'Square';
        this.selectedShape.id = square.id;
        this.selectedShape.name = square.name;
        this.setSelected(this.selectedShape);
    }

    addCircle(circle) {
        this.shapes.circles.push(circle);
        this.selectedShape.type = 'Circle';
        this.selectedShape.id = circle.id;
        this.selectedShape.name = circle.name;
        this.setSelected(this.selectedShape);
    }

    addTriangle(triangle) {
        this.shapes.triangles.push(triangle);
        this.selectedShape.type = 'Triangle';
        this.selectedShape.id = triangle.id;
        this.selectedShape.name = triangle.name;
        this.setSelected(this.selectedShape);
    }

    findSquareFromName(name) {
        for (let i in this.shapes.squares) {
            if (this.shapes.squares[i].name === name) {
                return this.shapes.squares[i];
            }
        }
        return null;
    };

    findCircleFromName(name) {
        for (let i in this.shapes.circles) {
            if (this.shapes.circles[i].name === name) {
                return this.shapes.circles[i];
            }
        }
        return null;
    };

    findTriangleFromName(name) {
        for (let i in this.shapes.triangles) {
            if (this.shapes.triangles[i].name === name) {
                return this.shapes.triangles[i];
            }
        }
        return null;
    };

    setSelected(shape) {
        this.selectedCircle = null;
        this.selectedSquare = null;
        this.selectedTriangle = null;

        if (shape === null) {
            return;
        }

        if (this.selectedShape.type === 'Circle') {
            this.selectedCircle = this.findCircleFromName(shape.name);
        } else if (this.selectedShape.type === 'Square') {
            this.selectedSquare = this.findSquareFromName(shape.name);
        } else if (this.selectedShape.type === 'Triangle') {
            this.selectedTriangle = this.findTriangleFromName(shape.name);
        }
    }

    removeShape(shape): boolean {
        let indexFound: number = -1;

        if (shape.type === 'Circle') {
            // Get Circle list index from name
            for (let i in this.shapes.circles) {
                if (this.shapes.circles[i].name === shape.name) {
                    indexFound = +i;
                }
            };

            if (indexFound => 0) {
                this.shapes.circles.splice(indexFound, 1);
                return true;
            }
        } else if (shape.type === 'Square') {
            // Get Square list index from name
            for (let i in this.shapes.squares) {
                if (this.shapes.squares[i].name === shape.name) {
                    indexFound = +i;
                }
            };
            if (indexFound => 0) {
                this.shapes.squares.splice(indexFound, 1);
                return true;
            }
        } else if (shape.type === 'Triangle') {
            // Get Triangle list index from name
            for (let i in this.shapes.triangles) {
                if (this.shapes.triangles[i].name === shape.name) {
                    indexFound = +i;
                }
            };
            if (indexFound => 0) {
                this.shapes.triangles.splice(indexFound, 1);
                return true;
            }
        }

        return false;
    }

}
