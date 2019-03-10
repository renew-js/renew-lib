import Viewer from './Viewer';
import BaseToolsModule from './features/base-tools';
import MetaShapeToolsModule from './features/meta-shape-tools';
import CreateModule from './tools/create';


export default class Modeler extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
                BaseToolsModule,
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

}
