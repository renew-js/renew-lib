import DirectEditingModule from 'diagram-js-direct-editing';

import { EditActivateBehavior } from './behaviors/EditActivateBehavior';
import { EditCompleteBehavior } from './behaviors/EditCompleteBehavior';
import { EditProvider } from './providers/EditProvider';
import { EditTool } from './tools/EditTool';


export default {
    __depends__: [
        DirectEditingModule,
    ],
    __init__: [
        'edit',
    ],
    __behaviors__: [
        [ 'edit.activate', EditActivateBehavior ],
        [ 'edit.complete', EditCompleteBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [
        [ 'edit', EditTool ],
    ],

    edit: [ 'type', EditProvider ],
};
