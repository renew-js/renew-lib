import Viewer from './Viewer';

import BaseToolsModule from './modules/base-tools';
import MetaShapeToolsModule from './modules/meta-shape-tools';


export default class Modeler extends Viewer {
    constructor (options = {}) {
        super(Object.assign({
            modules: [
                BaseToolsModule,
                MetaShapeToolsModule,
            ],
        }, options));
    }

    addFormalism (plugin) {
        this.get('eventBus').fire('plugin.register.start', { plugin: plugin });
        this.get('eventBus').fire('plugin.register.end', { plugin: plugin });
    }
}
