export class CreateProvider {

    constructor (factory) {
        this.factory = factory;
    }

    shape (x, y) {
        return this.factory.createShape({ x, y });
    }

    centeredShape (x, y) {
        const shape = this.shape(x, y);
        shape.x -= Math.round(shape.width / 2);
        shape.y -= Math.round(shape.height / 2);
        return shape;
    }

    connection (source, target) {
        const waypoints = [ source, target ].map((object) => {
            return { x: object.x, y: object.y };
        });

        return this.factory.createConnection({ waypoints, source, target });
    }

    label (text, position) {
        return this.factory.createLabel({
            text: text || '',
            x: position.x,
            y: position.y,
            width: 150,
            height: 50,
        });
    }

}
