import { ZoomInBehavior } from './behaviors/ZoomInBehavior';
import { ZoomOutBehavior } from './behaviors/ZoomOutBehavior';
import { ZoomProvider } from './providers/ZoomProvider';


export default {
    __depends__: [],
    __init__: [
        'zoom',
    ],
    __behaviors__: [
        [ 'zoom.in', ZoomInBehavior ],
        [ 'zoom.out', ZoomOutBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    zoom: [ 'type', ZoomProvider ],
};
