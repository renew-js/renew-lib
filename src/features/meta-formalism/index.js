import { MetaPluginManager } from './MetaPluginManager';

export default {
    __depends__: [
    ],
    __init__: [
        'metaPluginManager',
    ],
    metaPluginManager: ['type', MetaPluginManager],
};
