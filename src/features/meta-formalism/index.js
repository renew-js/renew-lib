import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { MetaElementFactory } from './providers/MetaElementFactory';
import { MetaPluginManager } from './providers/MetaPluginManager';
import { MoveElementRule } from './rules/MoveElementRule';


export default {
    __depends__: [
    ],
    __init__: [
        'metaPluginManager',
        'metaFactory',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
    ],
    __rules__: [
        [ 'element.move', MoveElementRule ],
    ],
    metaPluginManager: [ 'type', MetaPluginManager ],
    metaFactory: [ 'type', MetaElementFactory ],
};
