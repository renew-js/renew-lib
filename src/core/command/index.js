import { RedoBehavior } from './behaviors/RedoBehavior';
import { UndoBehavior } from './behaviors/UndoBehavior';
import { CommandStack } from './providers/CommandStack';


export default {
    __depends__: [],
    __init__: [
        'commandStack',
    ],
    __behaviors__: [
        [ 'command.undo', UndoBehavior ],
        [ 'command.redo', RedoBehavior ],
    ],

    commandStack: [ 'type', CommandStack ],
};
