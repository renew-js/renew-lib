import Diagram from 'diagram-js';

import BaseShapesModule from '../features/base-shapes';
import BaseToolsModule from '../features/base-tools';
import MetaFormalismModule from '../features/meta-formalism';
import SvgRendererModule from '../renderer/svg';


/**
 *
 */
export default class Drawing {
    /**
     * @param {string} id
     */
    constructor (id) {
        this.container = document.querySelector('#' + id);
        this.options = {
            canvas: {
                container: this.container,
            },
            modules: [
                BaseToolsModule, // basic editor tools
                BaseShapesModule, // basic shapes
                MetaFormalismModule, // meta plugins
                SvgRendererModule,
            ],
        };
        this.diagram = new Diagram(this.options);
    }

    /**
     * @param {object} plugin
     */
    addFormalism (plugin) {
        this.diagram.get('metaContextPad').addFormalism(plugin);
        this.diagram.get('metaPalette').addFormalism(plugin);
        this.diagram.get('metaRules').addFormalism(plugin);
    }
}
