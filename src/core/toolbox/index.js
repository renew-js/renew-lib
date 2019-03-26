import { HoverBehavior } from './behaviors/HoverBehavior';
import { OutBehavior } from './behaviors/OutBehavior';
import { PreviousToolBehavior } from './behaviors/PreviousToolBehavior';
import { SnappedBehavior } from './behaviors/SnappedBehavior';
import { Toolbox } from './providers/Toolbox';
import InteractionEventModule from 'diagram-js/lib/features/interaction-events';
import { ToolManagerBehavior } from './behaviors/ToolManagerBehavior';


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
        [ 'tool-manager.update', ToolManagerBehavior ],
        [ 'toolbox.previous', PreviousToolBehavior ],
        [ 'snapping.snapped', SnappedBehavior ],
    ],
    toolbox: [ 'type', Toolbox ],
};
