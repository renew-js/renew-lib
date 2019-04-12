import { CursorSetBehavior } from './behaviors/CursorSetBehavior';
import { CursorUnsetBehavior } from './behaviors/CursorUnsetBehavior';
import { CursorProvider } from './providers/CursorProvider';


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
