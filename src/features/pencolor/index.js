import { PenColorBehavior } from './behaviors/PenColorBehavior';
import { PenColorProvider } from './providers/PenColorProvider';
import { PenColorCommand } from './commands/PenColorCommand';


export default {
    __depends__: [],
    __init__: [
        'penColor',
    ],
    __behaviors__: [
        [ 'setPenColor.color', PenColorBehavior ],
    ],
    __commands__: [
        [ 'setPencolor.color', PenColorCommand ],
    ],
    __rules__: [],
    __tools__: [],

    penColor: [ 'type', PenColorProvider ],
};
