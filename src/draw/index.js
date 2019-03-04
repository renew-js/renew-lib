import Styles from 'diagram-js/lib/draw/Styles';
import { PluginRegisterBehavior } from './behaviors/PluginRegisterBehavior';
import { Renderer } from './Renderer';


export default {
    __init__: [ 'renderer' ],
    __behaviors__: [
        [ 'plugin.register', 1500, PluginRegisterBehavior ],
    ],
    styles: [ 'type', Styles ],
    renderer: [ 'type', Renderer ],
};
