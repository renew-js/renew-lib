export class ConnectProvider {

    constructor (factory) {
        this.factory = factory;
    }

    connection (src, dest) {
        const toPoint = (object) => {
            return { x: object.x, y: object.y };
        };

        return this.factory.createConnection({
            waypoints: [ toPoint(src), toPoint(dest) ],
            source: src,
            target: dest,
        });
    }

}
