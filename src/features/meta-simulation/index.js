import SimulationManagerModule from '../simulation-manager';

import { MetaSimulation } from './providers/MetaSimulation';


export default {
    __depends__: [
        SimulationManagerModule,
    ],
    __init__: [
        'metaSimulation',
    ],
    __behaviors__: [],
    __commands__: [],
    __rules__: [],
    __tools__: [],
    metaSimulation: [ 'type', MetaSimulation ],
};
