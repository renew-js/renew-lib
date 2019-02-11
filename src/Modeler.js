import Viewer from './Viewer';
import BaseShapesModule from './features/base-shapes';
import BaseToolsModule from './features/base-tools';
import MetaFormalismModule from './features/meta-formalism';
import DrawModule from './draw';


/**
 *
 */
export default class Modeler extends Viewer {
    /**
     * @param {string} id
     */
    constructor (id) {
        super({
            modules: [
                DrawModule,
                BaseToolsModule, // basic editor tools
                // BaseShapesModule, // basic shapes
                MetaFormalismModule, // meta plugins
            ],
        });
    }

    /**
     * @param {object} plugin
     */
    addFormalism (plugin) {
        this.get('metaContextPad').addFormalism(plugin);
        this.get('metaPalette').addFormalism(plugin);
        this.get('metaRules').addFormalism(plugin);
    }
}
