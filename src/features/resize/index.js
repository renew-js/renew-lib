import { ResizeBehavior } from './behavior/ResizeBehavior';


export default {
    __depends__: [
    ],
    __init__: [

    ],
    __behaviors__: [
        [ 'resize.end', 1500, ResizeBehavior ],
    ],
};
