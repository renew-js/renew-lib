import Diagram from 'diagram-js';

import SelectionModule from 'diagram-js/lib/features/selection';
import MetaModule from '../modules/MetaModule';


class Drawing {

    constructor (id) {
        this.container = document.querySelector('#' + id);
        this.diagram = new Diagram({
            canvas: {
                container: this.container
            },
            modules: [
                SelectionModule
            ]
        });
    }

    addFormalism (plugin) {
        // TODO: Add formalism like this:
        // this.diagram.addModule(new MetaModule(plugin));
    }

}
