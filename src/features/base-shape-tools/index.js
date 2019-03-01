import PaletteModule from 'diagram-js/lib/features/palette';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import RulesModule from 'diagram-js/lib/features/rules';

import { BaseShapesPalette } from './BaseShapesPalette';
import { BaseShapesContextPad } from './BaseShapesContextPad';
import { BaseShapesRules } from './BaseShapesRules';

export default {
    __depends__: [
        PaletteModule,
        ContextPadModule,
        RulesModule,
    ],
    __init__: [
        'baseShapesPalette',
        'baseShapesContextPad',
        'baseShapesRules',
    ],
    baseShapesPalette: ['type', BaseShapesPalette],
    baseShapesContextPad: ['type', BaseShapesContextPad],
    baseShapesRules: ['type', BaseShapesRules],
};
