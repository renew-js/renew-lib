import { VisibilityBehavior } from './behaviors/VisibilityBehavior';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { VisibilityCommand } from './commands/VisibilityCommand';

export default {
    __depends__: [],
    __init__: [
        'visibility',
    ],
    __behaviors__: [
        [ 'visibility.attribute', VisibilityBehavior ],
    ],
    __commands__: [
        [ 'visibility.attribute', VisibilityCommand ],
    ],
    __rules__: [],
    __tools__: [],

    visibility: [ 'type', VisibilityProvider ],
};
