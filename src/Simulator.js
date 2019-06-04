import Viewer from './Viewer';

import MetaSimulationModule from './features/meta-simulation';
import ExternalSimulationModule from './features/external-simulation';


/**
 *
 */
export default class Simulator extends Viewer {

    constructor (options = { canvas: { } }) {
        options.canvas.id = 'rnw-simulator';

        super(Object.assign({
            modules: [
                MetaSimulationModule,
                ExternalSimulationModule,
            ],
        }, options));
    }

    resetSimulation () {

    }

    stepSimulation () {

    }

}
