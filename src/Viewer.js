import Diagram from 'diagram-js';

import CoreModule from './core';
import DrawModule from './draw';
import LayouterModule from './features/layouter';
import SelectionModule from './features/selection';
import ExportModule from './features/export';
import ImportModule from './features/import';

import { Injector } from './core/Injector';


export default class Viewer extends Diagram {

    constructor (options = { modules: [ ], canvas: { } }) {
        const container = document.createElement('div');
        container.id = options.canvas.id || 'rnw-viewer';
        container.className = 'rnw-container';

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

        this.fire('attach.before', { instance: this, parentNode });

        parentNode.appendChild(this.container);

        this.get('canvas').resized();

        this.fire('attach.after', { instance: this, parentNode });
    }

    detach () {
        this.fire('detach.before', { instance: this });

        const parentNode = this.container.parentNode;

        if (!parentNode) {
            return;
        }

        parentNode.removeChild(this.container);

        this.fire('detach.after', { instance: this });
    }

    fire (eventName, payload, middleware) {
        this.get('eventBus').fire(eventName, payload, middleware);
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
