import MinimapModule from 'diagram-js-minimap';
import OriginModule from 'diagram-js-origin';
import ResizeModule from './features/resize';
import EditModule from './features/edit';
import FillColorModule from './features/fillcolor';
import PreviewModule from './features/preview';
import SnappingModule from './features/snapping';
import KeyboardEventsModule from './features/keyboard-events';

import Viewer from './Viewer';
import BaseToolsModule from './features/base-tools';
import MetaShapeToolsModule from './features/meta-tools';

import FillColorModule from './features/fillcolor';
import FillOpaquenessModule from './features/fill-opaqueness';
import PenOpaquenessModule from './features/pen-opaqueness';
import VisibilityModule from './features/visibility';
import LineWidthModule from './features/linewidth';
import PenColorModule from './features/pencolor';

import TextStyleModule from './features/textstyle';

export default class Modeler extends Viewer {

    constructor (options = { canvas: { } }) {
        options.canvas.id = 'rnw-modeler';

        super(Object.assign({
            modules: [
                BaseToolsModule,
                MetaShapeToolsModule,

                ResizeModule,
                EditModule,
                FillColorModule,

                MinimapModule,
                OriginModule,
                SnappingModule,
                PreviewModule,
                KeyboardEventsModule,

                FillColorModule,
                LineWidthModule,
                PenColorModule,
                FillOpaquenessModule,
                PenOpaquenessModule,
                VisibilityModule,
                TextStyleModule,
            ],
        }, options));

        const toolbox = this.get('toolbox');
        toolbox.setDefaultTool('pointer');
        toolbox.activate('pointer');
    }

}
