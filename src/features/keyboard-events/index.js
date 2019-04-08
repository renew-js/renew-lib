import { AttachBehavior } from './behaviors/AttachBehavior';
import { DetachBehavior } from './behaviors/DetachBehavior';
import { KeyboardEvents } from './providers/KeyboardEvents';


export default {
    __depends__: [],
    __init__: [
        'keyboardEvents',
    ],
    __behaviors__: [
        [ 'attach', AttachBehavior ],
        [ 'detach', DetachBehavior ],
    ],
    keyboardEvents: [ 'type', KeyboardEvents ],
};
