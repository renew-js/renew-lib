import FactoryModule from '../factory';
import { HandleBehavior } from './behaviors/HandleBehavior';
import { HandlesShowBehavior } from './behaviors/HandlesShowBehavior';
import { HandlesHideBehavior } from './behaviors/HandlesHideBehavior';
import { HandleProvider } from './providers/HandleProvider';
import { HandleFactory } from './providers/HandleFactory';


export default {
    __depends__: [
        FactoryModule,
    ],
    __init__: [
        'handle',
    ],
    __behaviors__: [
        [ 'handle', HandleBehavior ],
        [ 'handles.show', HandlesShowBehavior ],
        [ 'handles.hide', HandlesHideBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    handle: [ 'type', HandleProvider ],
    handleFactory: [ 'type', HandleFactory ],
};
