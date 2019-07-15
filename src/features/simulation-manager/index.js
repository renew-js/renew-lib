import {
    SimulationInitBehavior,
} from './behaviors/SimulationInitBehavior';
import { SimulationManager } from './providers/SimulationManager';


export default {
    __depends__: [],
    __init__: [
        'simulationManager',
    ],
    __behaviors__: [
        [ 'simulation.init', 1500, SimulationInitBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    simulationManager: [ 'type', SimulationManager ],
};
