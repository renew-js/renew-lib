import LayoutModule from '../layouter';

import { MoveBehavior } from './behaviors/MoveBehavior';
import { MovePreviewBehavior } from './behaviors/MovePreviewBehavior';
import { MoveElementsCommand } from './commands/MoveElementsCommand';
import { MoveProvider } from './providers/MoveProvider';
import { MoveElementsRule } from './rules/MoveElementsRule';


export default {
    __depends__: [
        LayoutModule,
    ],
    __init__: [
        'move',
    ],
    __behaviors__: [
        [ 'move.elements', MoveBehavior ],
        [ 'move.preview', MovePreviewBehavior ],
    ],
    __commands__: [
        [ 'move.elements', MoveElementsCommand ],
    ],
    __rules__: [
        [ 'move.elements', MoveElementsRule ],
    ],

    move: [ 'type', MoveProvider ],
};
