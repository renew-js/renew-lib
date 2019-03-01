import Viewer from './Viewer';


/**
 *
 */
export default class Simulator extends Viewer {
    constructor (options = {}) {
        super(Object.assign({
            modules: [
                // MetaSimulationModule,
            ],
        }, options));
    }

    resetSimulation () {

    }

    stepSimulation () {

    }
}
