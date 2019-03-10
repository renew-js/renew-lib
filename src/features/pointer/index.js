import { PointerTool } from './tools/PointerTool';
import LassoModule from 'diagram-js/lib/features/lasso-tool';


export default {
    __depends__: [
        LassoModule,
    ],
    __init__: [
    ],
    __behaviors__: [
    ],
    __commands__: [
    ],
    __rules__: [
    ],
    __tools__: [
        [ 'pointer', PointerTool ],
    ],
};
