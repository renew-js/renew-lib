import Diagram from 'diagram-js';

import BaseShapesModule from '../features/base-shapes';
import BaseToolsModule from '../features/base-tools';
import MetaFormalismModule from '../features/meta-formalism';
import DrawModule from '../draw';


/**
 *
 */
export default class Drawing extends Diagram {
    /**
     * @param {string} id
     */
    constructor (id) {
        super({
            canvas: { container: document.querySelector('#' + id) },
            modules: [
                DrawModule,
                BaseToolsModule, // basic editor tools
                BaseShapesModule, // basic shapes
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
