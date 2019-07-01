import SimulationManagerModule from '../simulation-manager';

import {
    StartSimulationBehavior,
} from './behaviors/StartSimulationBehavior';
import { ExternalSimulation } from './providers/ExternalSimulation';

export default {
    __depends__: [
        SimulationManagerModule,
    ],
    __init__: [
        'externalSimulation',
    ],
    __behaviors__: [
        [ 'simulation.start', StartSimulationBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    externalSimulation: [ 'type', ExternalSimulation ],
};
