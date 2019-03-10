import Viewer from './Viewer';
import BaseToolsModule from './features/base-tools';
import MetaShapeToolsModule from './features/meta-tools';


export default class Modeler extends Viewer {

    constructor (options = {}) {
        super(Object.assign({
            modules: [
                BaseToolsModule,
                MetaShapeToolsModule,
            ],
        }, options));
        const toolbox = this.get('toolbox');
        toolbox.setDefaultTool('pointer');
        toolbox.activate('pointer');
    }

}
