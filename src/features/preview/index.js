import { PreviewClearBehavior } from './behaviors/PreviewClearBehavior';
import { PreviewInitBehavior } from './behaviors/PreviewInitBehavior';
import { PreviewMoveBehavior } from './behaviors/PreviewMoveBehavior';
import { PreviewProvider } from './providers/PreviewProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'preview',
    ],
    __behaviors__: [
        [ 'preview.init', PreviewInitBehavior ],
        [ 'preview.move', PreviewMoveBehavior ],
        [ 'preview.clear', PreviewClearBehavior ],
    ],

    preview: [ 'type', PreviewProvider ],
};
