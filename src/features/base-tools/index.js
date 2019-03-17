import PaletteModule from 'diagram-js/lib/features/palette';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import AutoScrollModule from 'diagram-js/lib/features/auto-scroll';
import PointerModule from '../pointer';
import HandModule from '../hand';

import { BaseToolsPalette } from './BaseToolsPalette';

export default {
    __depends__: [
        PaletteModule,

        PointerModule,
        HandModule,

//        ZoomScrollModule,
//        AutoScrollModule,
    ],
    __init__: [
        'basePalette',
    ],
    basePalette: [ 'type', BaseToolsPalette ],
};
