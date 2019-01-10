import Diagram from 'diagram-js';

import SelectionModule from 'diagram-js/lib/features/selection';
import MetaModule from '../modules/MetaModule';


class Drawing {
    __construct(id) {
        this.container = document.querySelector('#' + id);
        this.diagram = new Diagram({
            canvas: {
                container: this.container;
            },
            modules: [
                SelectionModule,
                MetaModule,
            ]
        });
    }
}
