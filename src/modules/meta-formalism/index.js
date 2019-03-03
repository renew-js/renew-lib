import { RegisterPluginBehavior } from './behaviors/RegisterPluginBehavior';
import { MetaPluginManager } from './MetaPluginManager';

export default {
    __depends__: [
    ],
    __init__: [
        'metaPluginManager',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, RegisterPluginBehavior ],
    ],
    metaPluginManager: ['type', MetaPluginManager],
};
