import { ResizeBehavior } from './behavior/ResizeBehavior';
import ResizeModule from 'diagram-js/lib/features/resize';


export default {
    __depends__: [
        ResizeModule,
    ],
    __init__: [

    ],
    __behaviors__: [
        [ 'resize.end', 1500, ResizeBehavior ],
    ],
};
