import Canvas from 'diagram-js/lib/core/Canvas';
import CommandModule from 'diagram-js/lib/command';
import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import EventBus from 'diagram-js/lib/core/EventBus';
import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory';


export default {
    __depends__: [
        CommandModule,
    ],
    __init__: [
        'canvas',
    ],

    canvas: [ 'type', Canvas ],
    eventBus: [ 'type', EventBus ],
    elementRegistry: [ 'type', ElementRegistry ],
    elementFactory: [ 'type', ElementFactory ],
    graphicsFactory: [ 'type', GraphicsFactory ],
};

/*
const commands = [ ];
const behaviors = [ ];
const rules = [ ];
*/
