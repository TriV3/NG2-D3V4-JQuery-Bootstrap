export class Shape {
    public type: string;
    public id: number;
    public name: string;
    public x?: number;
    public y?: number;

    constructor(
        type: string,
        id: number,
        name: string,
        x?: number,
        y?: number
    ) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.x = x || 0;
        this.y = y || 0;
    }
}

export class Square extends Shape {
    constructor(
        id: number,
        name: string,
        x?: number,
        y?: number
    ) {
        super('Square', id, name, x, y);
    }
}

export class Circle extends Shape {
    constructor(
        id: number,
        name: string,
        x?: number,
        y?: number
    ) {
        super('Circle', id, name, x, y);
    }
}

export class Triangle extends Shape {
    constructor(
        id: number,
        name: string,
        x?: number,
        y?: number
    ) {
        super('Triangle', id, name, x, y);
    }
}
