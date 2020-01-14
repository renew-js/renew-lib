import Diagram from 'diagram-js';

import CoreModule from './core';
import DrawModule from './draw';
import LayouterModule from './features/layouter';
import SelectionModule from './features/selection';
import ZoomModule from './features/zoom';
import FillColorModule from './features/fillcolor';
import LineWidthModule from './features/linewidth';
import PenColorModule from './features/pencolor';
import ExportModule from './features/export';
import ImportModule from './features/import';
import RemoveModule from './features/remove';
import PreviewModule from './features/preview';
import ResizeModule from './features/resize';
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
            ZoomModule,
            LayouterModule,
            SelectionModule,
            ExportModule,
            ImportModule,
            FillColorModule,
            LineWidthModule,
            PenColorModule,
            ResizeModule,
            RemoveModule,
            PreviewModule
        ].concat(options.modules));

        super(options, injector);

        this.injector = injector;
        this.container = container;
    }

    attachTo (parentNode) {
        this.detach();

        this.fire('attach.start', { instance: this, parentNode });

        parentNode.appendChild(this.container);

        this.get('canvas').resized();

        this.fire('attach.end', { instance: this, parentNode });
    }

    detach () {
        const parentNode = this.container.parentNode;

        if (!parentNode) {
            return;
        }

        this.fire('detach.start', { instance: this });

        parentNode.removeChild(this.container);

        this.fire('detach.end', { instance: this });
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
