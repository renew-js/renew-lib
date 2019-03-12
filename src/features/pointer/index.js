import LassoModule from 'diagram-js/lib/features/lasso-tool';

import { LassoBehavior } from './behaviors/LassoBehavior';
import { MoveSelectionBehavior } from './behaviors/MoveSelectionBehavior';
import { SelectBehavior } from './behaviors/SelectBehavior';
import { MoveSelectionCommand } from './commands/MoveSelectionCommand';
import { PointerTool } from './tools/PointerTool';


export default {
    __depends__: [
        LassoModule,
    ],
    __init__: [],
    __behaviors__: [
        [ 'pointer.lasso', LassoBehavior ],
        [ 'pointer.select', SelectBehavior ],
        [ 'selection.move', MoveSelectionBehavior ],
    ],
    __commands__: [
        [ 'selection.move', MoveSelectionCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'pointer', PointerTool ],
    ],
};
