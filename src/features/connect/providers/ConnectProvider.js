export class ConnectProvider {

    constructor (defaultFactory) {
        this.defaultFactory = defaultFactory;
        this.factory = defaultFactory;
    }

    connection (src, dest) {
        const toPoint = (object) => {
            return { x: object.x, y: object.y };
        };

        const connection = this.factory.createConnection();
        connection.waypoints = [ toPoint(src), toPoint(dest) ];
        connection.source = src;
        connection.target = dest;
        return connection;
    }

    resetFactory () {
        this.factory = this.defaultFactory;
    }

}
