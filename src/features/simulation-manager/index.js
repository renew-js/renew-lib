import {
    SimulationStartBehavior,
} from './behaviors/SimulationStartBehavior';
import { SimulationManager } from './providers/SimulationManager';


export default {
    __depends__: [],
    __init__: [
        'simulationManager',
    ],
    __behaviors__: [
        [ 'simulation.start', 1500, SimulationStartBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    simulationManager: [ 'type', SimulationManager ],
};
