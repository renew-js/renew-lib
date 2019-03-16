import SelectionModule from '../selection';

import { MoveSelectionBehavior } from './behaviors/MoveSelectionBehavior';
import { MoveElementsCommand } from './commands/MoveElementsCommand';
import { MoveProvider } from './providers/MoveProvider';


export default {
    __depends__: [
        SelectionModule
    ],
    __init__: [
        'move'
    ],
    __behaviors__: [
        [ 'move.selection', MoveSelectionBehavior ]
    ],
    __commands__: [
        [ 'move.elements', MoveElementsCommand ]
    ],

    move: [ 'type', MoveProvider ]
}
