import DirectEditingModule from 'diagram-js-direct-editing';

import { ActivateDefaultBehavior } from './behaviors/ActivateDefaultBehavior';
import { EditActivateBehavior } from './behaviors/EditActivateBehavior';
import { EditCompleteBehavior } from './behaviors/EditCompleteBehavior';
import { EditLabelCommand } from './commands/EditLabelCommand';
import { EditProvider } from './providers/EditProvider';
import { EditTool } from './tools/EditTool';
import { DoubleClickTextstyleBehavior } from
    './behaviors/DoubleClickTextstyleBehavior';

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
        [ 'directEditing.complete', ActivateDefaultBehavior ],
        [ 'edit.dblClickTextstyle', DoubleClickTextstyleBehavior ],
    ],
    __commands__: [
        [ 'edit.label', EditLabelCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'edit', EditTool ],
    ],

    edit: [ 'type', EditProvider ],
};
