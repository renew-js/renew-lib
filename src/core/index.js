import Canvas from 'diagram-js/lib/core/Canvas';
import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory';
import EventBusModule from './eventBus';
import CommandStackModule from './command';
import PolicyModule from './policy';
import ToolboxModule from './toolbox';

import { ElementFactory } from '../features/factory/providers/ElementFactory';


export default {
    __depends__: [
        EventBusModule,
        CommandStackModule,
        ToolboxModule,
        PolicyModule,
    ],
    __init__: [
        'canvas',
        'elementRegistry',
        'elementFactory',
        'graphicsFactory',
    ],

    canvas: [ 'type', Canvas ],
    elementRegistry: [ 'type', ElementRegistry ],
    elementFactory: [ 'type', ElementFactory ],
    graphicsFactory: [ 'type', GraphicsFactory ],
};
