import MetaFormalismModule from '../meta-formalism';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import PaletteModule from 'diagram-js/lib/features/palette';
import RulesModule from 'diagram-js/lib/features/rules';

import { MetaContextPad } from '../meta-shape-tools/MetaContextPad';
import { MetaPalette } from '../meta-shape-tools/MetaPalette';
import { MetaRules } from '../meta-shape-tools/MetaRules';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';

export default {
    __depends__: [
        MetaFormalismModule,

        PaletteModule,
        ContextPadModule,
        RulesModule,

//        ModelingModule,
    ],
    __init__: [
        'metaPalette',
        'metaContextPad',
        'metaRules',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ]
    ],
    __rules__: [
        // TODO
    ],
    metaPalette: [ 'type', MetaPalette ],
    metaContextPad: [ 'type', MetaContextPad ],
    metaRules: [ 'type', MetaRules ],
};
