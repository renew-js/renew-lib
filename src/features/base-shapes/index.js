import PaletteModule from 'diagram-js/lib/features/palette';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/connect';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';

import { BaseShapesPalette } from './BaseShapesPalette';
import { BaseShapesContextPad } from './BaseShapesContextPad';

export default {
    __depends__: [
        PaletteModule,
        ContextPadModule,
        CreateModule,
        ModelingModule,
        MoveModule,
        OutlineModule,
    ],
    __init__: [
        'baseShapesPalette',
        'baseShapesContextPad',
    ],
    baseShapesPalette: ['type', BaseShapesPalette],
    baseShapesContextPad: ['type', BaseShapesContextPad],
};
