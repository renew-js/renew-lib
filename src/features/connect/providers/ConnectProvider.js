import { DefaultFactory } from '../util/DefaultFactory';


export class ConnectProvider {

    constructor () {
        this.factory = new DefaultFactory();
    }

    connection (start, end) {
        return this.factory.create([ start, end ]);
    }

    resetFactory () {
        this.factory = new DefaultFactory();
    }

}
