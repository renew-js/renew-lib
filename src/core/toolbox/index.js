import { Toolbox } from './providers/Toolbox';


export default {
    __depends__: [
    ],
    __init__: [
        'toolbox',
    ],

    toolbox: [ 'type', Toolbox ],
};
