import ContextPadModule from 'diagram-js/lib/features/context-pad';
import PaletteModule from 'diagram-js/lib/features/palette';
import ConnectModule from 'diagram-js/lib/features/create';
import CreateModule from 'diagram-js/lib/features/connect';
import ModelingModule from 'diagram-js/lib/features/modeling';
import RulesModule from 'diagram-js/lib/features/rules';

import { MetaContextPad } from './MetaContextPad';
import { MetaPalette } from './MetaPalette';
import { MetaRules } from './MetaRules';

export default {
    __depends__: [
        PaletteModule,
        ContextPadModule,
        ConnectModule,
        CreateModule,
        ModelingModule,
        RulesModule,
    ],
    __init__: [
        'metaContextPad',
        'metaPalette',
        'metaRules',
    ],
    metaContextPad: ['type', MetaContextPad],
    metaPalette: ['type', MetaPalette],
    metaRules: ['type', MetaRules],
};
