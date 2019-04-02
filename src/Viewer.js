import Diagram from 'diagram-js';

import CoreModule from './core';
import DrawModule from './draw';
import LayouterModule from './features/layouter';
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

        const injector = new Injector([
            { 'config': [ 'value', options ] },
            CoreModule,
            DrawModule,
            LayouterModule,
            SelectionModule,
            ExportModule,
            ImportModule,
        ].concat(options.modules));

        super(options, injector);

        this.injector = injector;
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

    fire (eventName, context) {
        return this.get('eventBus').fire(eventName, context);
    }

    on (eventName, callback) {
        this.get('eventBus').on(eventName, callback);
    }

    off (eventName, callback) {
        this.get('eventBus').off(eventName, callback);
    }

    addFormalism (plugin) {
        const pluginInstance = this.injector.instantiate(plugin);
        this.fire('plugin.register', {
            plugin: pluginInstance,
        });
    }

}
