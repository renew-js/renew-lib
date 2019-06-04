import { SimulationManager } from './providers/SimulationManager';


export default {
    __depends__: [],
    __init__: [
        'simulationManager',
    ],
    __behaviors__: [],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    simulationManager: [ 'type', SimulationManager ],
};
