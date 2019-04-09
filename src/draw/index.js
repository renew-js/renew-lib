import FactoryModule from '../features/factory';

import Styles from 'diagram-js/lib/draw/Styles';
import MetaFactoryModule from '../features/meta-factory';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { SetRootElementBehavior } from './behaviors/SetRootElementBehavior';
import { Renderer } from './Renderer';
import { TextRenderer } from './TextRenderer';


export default {
    __depends__: [
        FactoryModule,
        MetaFactoryModule,
    ],
    __init__: [
        'renderer',
        'styles',
        'defaultFactory',
    ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
        [ 'canvas.init', 1500, SetRootElementBehavior ],
    ],
    styles: [ 'type', Styles ],
    renderer: [ 'type', Renderer ],
    textRenderer: [ 'type', TextRenderer ],
};
