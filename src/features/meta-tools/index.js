import MetaFormalismModule from '../meta-formalism';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import PaletteModule from 'diagram-js/lib/features/palette';
import CreateModule from '../create';
import RemoveModule from '../remove';
import ConnectModule from '../connect';

import { MetaContextPad } from './MetaContextPad';
import { MetaPalette } from './MetaPalette';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { ConnectionCreateRule } from './rules/ConnectionCreateRule';
import { ConnectionStartRule } from './rules/ConnectionStartRule';

export default {
    __depends__: [
        MetaFormalismModule,

        PaletteModule,
        ContextPadModule,

        CreateModule,
        RemoveModule,
        ConnectModule,
    ],
    __init__: [
        'metaPalette',
        'metaContextPad',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
    ],
    __rules__: [
        [ 'connection.create', ConnectionCreateRule ],
        [ 'connection.start', ConnectionStartRule ],
    ],
    metaPalette: [ 'type', MetaPalette ],
    metaContextPad: [ 'type', MetaContextPad ],
};
