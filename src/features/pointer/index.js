import SelectionModule from '../selection';
import RubberBandModule from '../rubber-band';
import MoveModule from '../move';

import { SelectBehavior } from './behaviors/SelectBehavior';
import { MoveSelectionCommand } from './commands/MoveSelectionCommand';
import { PointerTool } from './tools/PointerTool';


export default {
    __depends__: [
        SelectionModule,
        RubberBandModule,
        MoveModule,
    ],
    __init__: [],
    __behaviors__: [
        [ 'pointer.select', SelectBehavior ],
    ],
    __commands__: [
        [ 'selection.move', MoveSelectionCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'pointer', PointerTool ],
    ],
};
