import Diagram from 'diagram-js';

import CoreModule from './core';
import DrawModule from './draw';
import ExportModule from './modules/export';
import ImportModule from './modules/import';

import { Injector } from './util/Injector';


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
            ExportModule,
            ImportModule,
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

}
