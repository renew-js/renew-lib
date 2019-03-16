import { MoveBehavior } from './behaviors/MoveBehavior';
import { MovePreviewBehavior } from './behaviors/MovePreviewBehavior';
import { MoveElementsCommand } from './commands/MoveElementsCommand';
import { MoveProvider } from './providers/MoveProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'move'
    ],
    __behaviors__: [
        [ 'move.elements', MoveBehavior ],
        [ 'move.preview', MovePreviewBehavior ]
    ],
    __commands__: [
        [ 'move.elements', MoveElementsCommand ]
    ],

    move: [ 'type', MoveProvider ]
}
