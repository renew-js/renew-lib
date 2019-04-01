import { DefaultFactory } from '../util/DefaultFactory';


export class ConnectProvider {

    constructor () {
        this.factory = new DefaultFactory();
    }

    connection (src, dest) {
        const toPoint = (object) => {
            return { x: object.x, y: object.y };
        };
        const connection = this.factory.create([ toPoint(src), toPoint(dest) ]);
        connection.source = src;
        connection.target = dest;
        return connection;
    }

    resetFactory () {
        this.factory = new DefaultFactory();
    }

}
