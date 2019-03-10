import PaletteModule from 'diagram-js/lib/features/palette';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import AutoScrollModule from 'diagram-js/lib/features/auto-scroll';

import { BaseToolsPalette } from './BaseToolsPalette';

export default {
    __depends__: [
        PaletteModule,

        SelectionModule,
        ZoomScrollModule,
        MoveCanvasModule,
        AutoScrollModule,
    ],
    __init__: [
        'basePalette',
    ],
    basePalette: [ 'type', BaseToolsPalette ],
};
