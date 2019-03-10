import PaletteModule from 'diagram-js/lib/features/palette';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import HandToolModule from 'diagram-js/lib/features/hand-tool';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import AutoScrollModule from 'diagram-js/lib/features/auto-scroll';

import { BaseToolsPalette } from './BaseToolsPalette';

export default {
    __depends__: [
        PaletteModule,
        LassoToolModule,
        HandToolModule,
        SelectionModule,
        ZoomScrollModule,
        MoveCanvasModule,
        AutoScrollModule,
    ],
    __init__: [
        'baseToolsPalette',
    ],
    baseToolsPalette: [ 'type', BaseToolsPalette ],
};
