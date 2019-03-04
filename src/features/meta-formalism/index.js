import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { MetaPluginManager } from './MetaPluginManager';

export default {
    __depends__: [
    ],
    __init__: [
        'metaPluginManager',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
    ],
    metaPluginManager: [ 'type', MetaPluginManager ],
};
