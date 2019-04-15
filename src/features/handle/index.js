import { HandleBehavior } from './behaviors/HandleBehavior';
import { HandleProvider } from './providers/HandleProvider';


export default {
    __depends__: [],
    __init__: [
        'handle',
    ],
    __behaviors__: [
        [ 'handle', HandleBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    handle: [ 'type', HandleProvider ],
};
