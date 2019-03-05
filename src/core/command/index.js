import { CommandStack } from './providers/CommandStack';


export default {
    __depends__: [],
    __init__: [
        'commandStack',
    ],

    commandStack: [ 'type', CommandStack ],
};
