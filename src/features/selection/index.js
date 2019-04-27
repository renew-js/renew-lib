import OutlineModule from 'diagram-js/lib/features/outline';
import HandleModule from '../handle';
import OrientationModule from '../orientation';
import { SelectAllBehavior } from './behaviors/SelectAllBehavior';
import { SelectedBehavior } from './behaviors/SelectedBehavior';
import { SelectionAddBehavior } from './behaviors/SelectionAddBehavior';
import { SelectionClearBehavior } from './behaviors/SelectionClearBehavior';
import { SelectionRemoveBehavior } from './behaviors/SelectionRemoveBehavior';
import { MoveElementsBehavior } from './behaviors/MoveElementsBehavior';
import { SelectionHandlesProvider } from './providers/SelectionHandlesProvider';
import { SelectionProvider } from './providers/SelectionProvider';


export default {
    __depends__: [
        OutlineModule,
        HandleModule,
        OrientationModule,
    ],
    __init__: [
        'selectionHandles',
        'selection',
    ],
    __behaviors__: [
        [ 'select.all', SelectAllBehavior ],
        [ 'selection.changed', SelectedBehavior ],
        [ 'selection.clear', SelectionClearBehavior ],
        [ 'selection.add', SelectionAddBehavior ],
        [ 'selection.remove', SelectionRemoveBehavior ],
        [ 'shape.remove', SelectionRemoveBehavior ],
        [ 'connection.remove', SelectionRemoveBehavior ],
        [ 'move.elements', MoveElementsBehavior ],
        [ 'resize.element', MoveElementsBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    selectionHandles: [ 'type', SelectionHandlesProvider ],
    selection: [ 'type', SelectionProvider ],
};
