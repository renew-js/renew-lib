import Viewer from './Viewer';

// import MetaSimulatingModule from './modules/meta-simulating';


/**
 *
 */
export default class Simulator extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
                // MetaSimulatingModule,
            ],
        }, options));
    }

    resetSimulation () {

    }

    stepSimulation () {

    }

}
