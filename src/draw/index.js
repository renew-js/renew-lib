import Styles from 'diagram-js/lib/draw/Styles';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { SetRootElementBehavior } from './behaviors/SetRootElementBehavior';
import { Renderer } from './Renderer';


export default {
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
};
