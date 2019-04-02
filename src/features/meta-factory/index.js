import { MetaFactory } from './providers/MetaFactory';


export default {
    __depends__: [],
    __init__: [
        'metaFactory',
    ],
    __behaviors__: [],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    metaFactory: [ 'type', MetaFactory ],
};
