import Viewer from './Viewer';
import MetaShapeToolsModule from './features/meta-shape-tools';
import CreateModule from './tools/create';


export default class Modeler extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
//                BaseToolsModule,
                MetaShapeToolsModule,

                CreateModule,

//                MoveModule,
//                ResizeModule,
//                BendpointsModule,
//                MetaLabelEditingModule,

//                SnappingModule,
            ],
        }, options));
    }

    addFormalism (plugin) {
        this.get('eventBus').fire('plugin.register', { plugin: plugin });
    }

}
