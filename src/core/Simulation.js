import Diagram from 'diagram-js';

import BaseShapesModule from '../features/base-shapes';
import BaseToolsModule from '../features/base-tools';
import MetaFormalismModule from '../features/meta-formalism';
import DrawModule from '../draw';


/**
 *
 */
export default class Simulation extends Diagram {
    /**
     * @param {string} id
     */
    constructor (id) {
        super({
            canvas: { container: document.querySelector('#' + id) },
            modules: [
                // DrawModule,
                // BaseToolsModule, // basic editor tools
                // SimulationModule,
                // MetaSimulationModule,
            ],
        });
    }

    resetSimulation () {

    }

    stepSimulation () {

    }
}
