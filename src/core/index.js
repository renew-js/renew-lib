import Canvas from 'diagram-js/lib/core/Canvas';
import CommandModule from 'diagram-js/lib/command';
import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import EventBusModule from './eventBus';
import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory';
import ToolboxModule from './toolbox';


export default {
    __depends__: [
        EventBusModule,
        CommandModule,
        ToolboxModule,
    ],
    __init__: [
        'canvas',
    ],

    canvas: [ 'type', Canvas ],
    elementRegistry: [ 'type', ElementRegistry ],
    elementFactory: [ 'type', ElementFactory ],
    graphicsFactory: [ 'type', GraphicsFactory ],
};
