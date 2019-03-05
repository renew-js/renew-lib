import { Toolbox } from './providers/Toolbox';
import InteractionEventModule from 'diagram-js/lib/features/interaction-events';


export default {
    __depends__: [
        InteractionEventModule,
    ],
    __init__: [
        'toolbox',
        'hoverFix'
    ],
    __behaviors__: [
        //[ '' ]
    ],
    toolbox: [ 'type', Toolbox ],
};
