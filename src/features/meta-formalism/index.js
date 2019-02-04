import ContextPadModule from 'diagram-js/lib/features/context-pad';
import GlobalConnect from 'diagram-js/lib/features/global-connect';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ConnectModule from 'diagram-js/lib/features/create';
import CreateModule from 'diagram-js/lib/features/connect';
import ModelingModule from 'diagram-js/lib/features/modeling';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import MetaModelingModule from '../meta-modeling';

import { MetaContextPad } from './MetaContextPad';
import { MetaPalette } from './MetaPalette';
import { MetaRules } from './MetaRules';

export default {
    __depends__: [
        PaletteModule,
        ContextPadModule,
        GlobalConnect,
        ConnectModule,
        CreateModule,
        ModelingModule,
        ResizeModule,
        MoveModule,
        OutlineModule,
        RulesModule,
        MetaModelingModule,
    ],
    __init__: [
        'metaContextPad',
        'metaPalette',
        'metaRules',
        'metaResize',
    ],
    metaContextPad: ['type', MetaContextPad],
    metaPalette: ['type', MetaPalette],
    metaRules: ['type', MetaRules],
};
