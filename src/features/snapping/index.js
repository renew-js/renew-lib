import { SnapBehavior } from './behaviors/SnapBehavior';
import { SnappingInitBehavior } from './behaviors/SnappingInitBehavior';
import { SnappingProvider } from './providers/SnappingProvider';


export default {
    __depends__: [
    ],
    __behaviors__: [
        [ 'preview.init', SnappingInitBehavior ],
        [ 'snapping.snap', SnapBehavior ],
    ],
    __init__: [
        'snapping',
    ],
    snapping: [ 'type', SnappingProvider ],
};
