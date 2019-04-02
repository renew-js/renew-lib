import Viewer from './Viewer';

// import MetaSimulatingModule from './modules/meta-simulating';


/**
 *
 */
export default class Simulator extends Viewer {

    constructor (options = { canvas: { } }) {
        options.canvas.id = 'rnw-simulator';

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
