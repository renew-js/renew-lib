import { FillOpaquenessBehavior } from './behaviors/FillOpaquenessBehavior';
import { FillOpaquenessProvider } from './providers/FillOpaquenessProvider';
import { FillOpaquenessCommand } from './commands/FillOpaquenessCommand';


export default {
    __depends__: [],
    __init__: [
        'fillOpaqueness',
    ],
    __behaviors__: [
        [ 'fillOpaqueness.opacity', FillOpaquenessBehavior ],
    ],
    __commands__: [
        [ 'fillOpaqueness.opacity', FillOpaquenessCommand ],
    ],
    __rules__: [],
    __tools__: [],

    fillOpaqueness: [ 'type', FillOpaquenessProvider ],
};
