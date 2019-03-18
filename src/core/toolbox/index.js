import { HoverBehavior } from './behaviors/HoverBehavior';
import { OutBehavior } from './behaviors/OutBehavior';
import { Toolbox } from './providers/Toolbox';
import InteractionEventModule from 'diagram-js/lib/features/interaction-events';
import { ToolManagerUpdateBehavior } from './behaviors/ToolManagerUpdateBehavior';


export default {
    __depends__: [
        InteractionEventModule,
    ],
    __init__: [
        'toolbox',
    ],
    __behaviors__: [
        [ 'element.hover', HoverBehavior ],
        [ 'element.out', OutBehavior ],
        [ 'tool-manager.update', ToolManagerUpdateBehavior ],
    ],
    toolbox: [ 'type', Toolbox ],
};
