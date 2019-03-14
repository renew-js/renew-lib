import Diagram from 'diagram-js';

import CoreModule from './core';
import DrawModule from './draw';
import SelectionModule from './features/selection';
import ExportModule from './features/export';
import ImportModule from './features/import';

import { Injector } from './core/Injector';


export default class Viewer extends Diagram {

    constructor (options = { modules: [ ] }) {
        // Create new container
        const container = document.createElement('div');
        container.className = 'rnw-container';

        // Pass container through options
        options.canvas = options.canvas || {};
        options.canvas.container = container;

        super(options, new Injector([
            { 'config': [ 'value', options ] },
            CoreModule,
            DrawModule,
            SelectionModule,
            //            ExportModule,
            //            ImportModule,
        ].concat(options.modules)));

        this.container = container;
    }

    attachTo (parentNode) {
        this.detach();

        parentNode.appendChild(this.container);

        this.get('canvas').resized();
    }

    detach () {
        const parentNode = this.container.parentNode;

        if (!parentNode) {
            return;
        }

        parentNode.removeChild(this.container);
    }

    addFormalism (plugin) {
        this.get('eventBus').fire('plugin.register', { plugin: plugin });
    }

}
