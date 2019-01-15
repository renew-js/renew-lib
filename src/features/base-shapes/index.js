import PaletteModule from 'diagram-js/lib/features/palette';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/connect';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import ResizeModule from 'diagram-js/lib/features/resize';

import { BaseShapesPalette } from './BaseShapesPalette';
import { BaseShapesContextPad } from './BaseShapesContextPad';
import { BaseShapesRules } from './BaseShapesRules';

export default {
    __depends__: [
        PaletteModule,
        ContextPadModule,
        CreateModule,
        ModelingModule,
        ResizeModule,
        MoveModule,
        OutlineModule,
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
