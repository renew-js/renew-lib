import { PenOpaquenessBehavior } from './behaviors/PenOpaquenessBehavior';
import { PenOpaquenessProvider } from './providers/PenOpaquenessProvider';
import { PenOpaquenessCommand } from './commands/PenOpaquenessCommand';


export default {
    __depends__: [],
    __init__: [
        'penOpaqueness',
    ],
    __behaviors__: [
        [ 'penOpaqueness.opacity', PenOpaquenessBehavior ],
    ],
    __commands__: [
        [ 'penOpaqueness.opacity', PenOpaquenessCommand ],
    ],
    __rules__: [],
    __tools__: [],

    penOpaqueness: [ 'type', PenOpaquenessProvider ],
};
