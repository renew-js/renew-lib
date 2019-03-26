import OutlineModule from 'diagram-js/lib/features/outline';
import { SelectedBehavior } from './behaviors/SelectedBehavior';
import { SelectionAddBehavior } from './behaviors/SelectionAddBehavior';
import { SelectionClearBehavior } from './behaviors/SelectionClearBehavior';
import { SelectionRemoveBehavior } from './behaviors/SelectionRemoveBehavior';
import { SelectionProvider } from './providers/SelectionProvider';


export default {
    __depends__: [
        OutlineModule,
    ],
    __init__: [
        'selection',
    ],
    __behaviors__: [
        [ 'selection.changed', SelectedBehavior ],
        [ 'selection.clear', SelectionClearBehavior ],
        [ 'selection.add', SelectionAddBehavior ],
        [ 'selection.remove', SelectionRemoveBehavior ],
        [ 'shape.remove', SelectionRemoveBehavior ],
        [ 'connection.remove', SelectionRemoveBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    selection: [ 'type', SelectionProvider ],
};
