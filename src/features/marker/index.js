import { MarkerClearBehavior } from './behaviors/MarkerClearBehavior';
import { MarkerSetBehavior } from './behaviors/MarkerSetBehavior';
import { MarkerProvider } from './providers/MarkerProvider';


export default {
    __depends__: [],
    __init__: [
        'marker'
    ],
    __behaviors__: [
        [ 'marker.clear', MarkerClearBehavior ],
        [ 'marker.set', MarkerSetBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    marker: [ 'type', MarkerProvider ]
};
