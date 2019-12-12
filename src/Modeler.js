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
            ],
        }, options));

        const toolbox = this.get('toolbox');
        toolbox.setDefaultTool('pointer');
        toolbox.activate('pointer');
    }

}