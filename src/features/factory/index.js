import { FactoryResetBehavior } from './behaviors/FactoryResetBehavior';
import { FactorySetBehavior } from './behaviors/FactorySetBehavior';
import { DefaultFactory } from './providers/DefaultFactory';
import { FactoryProvider } from './providers/FactoryProvider';


export default {
    __depends__: [],
    __init__: [],
    __behaviors__: [
        [ 'factory.set', FactorySetBehavior ],
        [ 'factory.reset', FactoryResetBehavior ],
    ],
    __commands__: [],
    __rules__: [],
    __tools__: [],

    factory: [ 'type', FactoryProvider ],
    defaultFactory: [ 'type', DefaultFactory ],
};
