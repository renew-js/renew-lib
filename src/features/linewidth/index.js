import { LineWidthBehavior } from './behaviors/LineWidthBehavior';
import { LineWidthProvider } from './providers/LineWidthProvider';
import { LineWidthCommand } from './commands/LineWidthCommand';


export default {
    __depends__: [],
    __init__: [
        'lineWidth',
    ],
    __behaviors__: [
        [ 'setLineWidth.width', LineWidthBehavior ],
    ],
    __commands__: [
        [ 'setLineWidth.width', LineWidthCommand ],
    ],
    __rules__: [],
    __tools__: [],

    lineWidth: [ 'type', LineWidthProvider ],
};
