import MinimapModule from 'diagram-js-minimap';
import OriginModule from 'diagram-js-origin';
import ResizeModule from './features/resize';
import PreviewModule from './features/preview';
import SnappingModule from './features/snapping';

import Viewer from './Viewer';
import BaseToolsModule from './features/base-tools';
import MetaShapeToolsModule from './features/meta-tools';
import MetaModelingModule from './features/meta-modeling';


export default class Modeler extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
                BaseToolsModule,
                MetaShapeToolsModule,

                MetaModelingModule,
                ResizeModule,
                //                MetaLabelEditingModule,

                MinimapModule,
                OriginModule,
                SnappingModule,
                PreviewModule,
            ],
        }, options));
        const toolbox = this.get('toolbox');
        toolbox.setDefaultTool('pointer');
        toolbox.activate('pointer');
    }

}
