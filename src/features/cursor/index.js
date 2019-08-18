import { CursorSetBehavior } from './behaviors/CursorSetBehavior';
import { CursorUnsetBehavior } from './behaviors/CursorUnsetBehavior';
import { CursorProvider } from './providers/CursorProvider';


/**
 * @module cursor
 *
 * This module handles the change of the cursor on specific
 * events. You can call it by the eventBus or directly with
 * the provider to set and unset a cursor.
 */
export default {
    __depends__: [],
    __init__: [
        'cursor',
    ],
    __behaviors__: [
        [ 'cursor.set', CursorSetBehavior ],
        [ 'cursor.unset', CursorUnsetBehavior ],
    ],
    __commands__: [],
    __rules__: [],

    cursor: [ 'type', CursorProvider ],
};
