import OutlineModule from 'diagram-js/lib/features/outline';
import { SelectedBehavior } from './behaviors/SelectedBehavior';
import { SelectionProvider } from './providers/SelectionProvider';


export default {
    __depends__: [
        OutlineModule
    ],
    __init__: [
        'selection'
    ],
    __behaviors__: [
        [ 'selection.changed', SelectedBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    selection: [ 'type', SelectionProvider ]
};
