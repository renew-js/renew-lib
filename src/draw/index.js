import Styles from 'diagram-js/lib/draw/Styles';
import Renderer from './Renderer';

export default {
    __init__: [ 'renderer' ],
    styles: [ 'type', Styles ],
    renderer: [ 'type', Renderer ],
};
