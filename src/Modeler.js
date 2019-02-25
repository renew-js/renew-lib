import Viewer from './Viewer';
import BaseToolsModule from './features/base-tools';
import MetaFormalismModule from './features/meta-formalism';
import DrawModule from './draw';


/**
 *
 */
export default class Modeler extends Viewer {
    constructor (options = {}) {
        super(Object.assign({
            modules: [
                DrawModule,
                BaseToolsModule, // basic editor tools
                // BaseShapesModule, // basic shapes
                MetaFormalismModule, // meta plugins
            ],
        }, options));
    }

    /**
     * @param {Formalism.Plugin} plugin
     */
    addFormalism (plugin) {
        /** @type {MetaPluginManager} metaPlugin */
        const metaPluginManager = this.get('metaPluginManager');
        metaPluginManager.register(plugin);
    }
}
