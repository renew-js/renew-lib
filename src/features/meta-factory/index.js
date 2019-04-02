import MetaFormalismModule from '../meta-formalism';

import { MetaFactory } from './providers/MetaFactory';


export default {
    __depends__: [
        MetaFormalismModule,
    ],
    __init__: [
        'metaFactory',
    ],
    __behaviors__: [],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    metaFactory: [ 'type', MetaFactory ],
};
