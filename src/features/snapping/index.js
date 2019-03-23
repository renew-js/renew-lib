import { SnapBehavior } from './behaviors/SnapBehavior';
import { SnappingInitBehavior } from './behaviors/SnappingInitBehavior';
import { SnappingProvider } from './providers/SnappingProvider';
import { SnappingClearBehavior } from './behaviors/SnappingClearBehavior';


export default {
    __depends__: [],
    __behaviors__: [
        [ 'preview.init', SnappingInitBehavior ],
        [ 'snapping.snap', SnapBehavior ],
        [ 'preview.clear', SnappingClearBehavior ],
    ],
    __init__: [
        'snapping',
    ],
    snapping: [ 'type', SnappingProvider ],
};
