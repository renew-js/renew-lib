import { ConnectSourceRule } from './rules/ConnectSourceRule';
import { ConnectTargetRule } from './rules/ConnectTargetRule';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { MetaPluginManager } from './providers/MetaPluginManager';
import { MoveElementRule } from './rules/MoveElementRule';


export default {
    __depends__: [ ],
    __init__: [
        'metaPluginManager',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
    ],
    __rules__: [
        [ 'connect.source', ConnectSourceRule ],
        [ 'connect.target', ConnectTargetRule ],
        [ 'element.move', MoveElementRule ],
    ],

    metaPluginManager: [ 'type', MetaPluginManager ],
};
