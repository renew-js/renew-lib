import { FillColorBehavior } from './behaviors/FillColorBehavior';
import { FillColorProvider } from './providers/FillColorProvider';
import { FillColorCommand } from './commands/FillColorCommand';

export default {
    __depends__: [],
    __init__: [
        'fillColor',
    ],
    __behaviors__: [
        [ 'fillColor.color', FillColorBehavior ],
    ],
    __commands__: [
        [ 'fillColor.color', FillColorCommand ],
    ],
    __rules__: [],
    __tools__: [],

    fillColor: [ 'type', FillColorProvider ],
};
