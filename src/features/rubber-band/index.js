import { LeaveCanvasBehavior } from './behaviors/LeaveCanvasBehavior';
import { PreviewBehavior } from './behaviors/PreviewBehavior';
import { SelectSurroundedBehavior } from './behaviors/SelectSurroundedBehavior';
import { RubberBandProvider } from './providers/RubberBandProvider';


export default {
    __depends__: [
        'selection',
    ],
    __init__: [
        'rubberBand',
    ],
    __behaviors__: [
        [ 'rubberBand.preview', PreviewBehavior ],
        [ 'rubberBand.select', SelectSurroundedBehavior ],
        [ 'element.out', LeaveCanvasBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    rubberBand: [ 'type', RubberBandProvider ],
};
