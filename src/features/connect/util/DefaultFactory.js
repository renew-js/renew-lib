import { ElementFactory } from '../../../core/ElementFactory';


export class DefaultFactory extends ElementFactory {

    constructor () {
        super();
    }

    create (waypoints = []) {
        return super.create('connection', {
            waypoints: waypoints,
            metaObject: {
                arrowEnd: 'arrow-head',
                lineColor: 'magenta',
            },
        });
    }

}
