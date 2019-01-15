import Diagram from 'diagram-js';

import SelectionModule from 'diagram-js/lib/features/selection';
import MetaModule from '../features/meta-formalism/MetaModule';


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
                SelectionModule,
                MetaModule,
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