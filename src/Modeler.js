import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import MoveModule from 'diagram-js/lib/features/move';

import Viewer from './Viewer';
import MetaLabelEditingModule from './modules/meta-label-editing';
import SnappingModule from './modules/snapping';
import ResizeModule from './modules/resize';
import BaseToolsModule from './modules/base-tools';
import MetaShapeToolsModule from './modules/meta-shape-tools';


export default class Modeler extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
                BaseToolsModule,
                MetaShapeToolsModule,

                MoveModule,
                ResizeModule,
                BendpointsModule,
                MetaLabelEditingModule,

                SnappingModule,
            ],
        }, options));
    }

    addFormalism (plugin) {
        this.get('eventBus').fire('plugin.register.start', { plugin: plugin });
        this.get('eventBus').fire('plugin.register.end', { plugin: plugin });
    }

}
