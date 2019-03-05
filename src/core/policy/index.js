import { Policy } from './providers/Policy';


export default {
    __depends__: [ ],
    __init__: [
        'policy'
    ],
    policy: [ 'type', Policy ],
};
