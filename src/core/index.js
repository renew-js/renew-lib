import ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import { Canvas } from './Canvas';
import EventBusModule from './eventBus';
import CommandStackModule from './command';
import PolicyModule from './policy';
import ToolboxModule from './toolbox';


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
    ],

    canvas: [ 'type', Canvas ],
    elementRegistry: [ 'type', ElementRegistry ],
};
