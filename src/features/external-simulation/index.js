import SimulationManagerModule from '../simulation-manager';

import {
    SimulationInitBehavior,
} from './behaviors/SimulationInitBehavior';
import {
    SimulationStartBehavior,
} from './behaviors/SimulationStartBehavior';
import {
    SimulationStepBehavior,
} from './behaviors/SimulationStepBehavior';
import {
    SimulationStopBehavior,
} from './behaviors/SimulationStopBehavior';
import {
    SimulationTerminateBehavior,
} from './behaviors/SimulationTerminateBehavior';
import { ExternalSimulation } from './providers/ExternalSimulation';

export default {
    __depends__: [
        SimulationManagerModule,
    ],
    __init__: [
        'externalSimulation',
    ],
    __behaviors__: [
        [ 'simulation.init', SimulationInitBehavior ],
        [ 'simulation.start', SimulationStartBehavior ],
        [ 'simulation.step', SimulationStepBehavior ],
        [ 'simulation.stop', SimulationStopBehavior ],
        [ 'simulation.terminate', SimulationTerminateBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    externalSimulation: [ 'type', ExternalSimulation ],
};
