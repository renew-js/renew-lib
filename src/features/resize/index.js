import { ResizeElementBehavior } from './behaviors/ResizeElementBehavior';
import { ResizeElementCommand } from './commands/ResizeElementCommand';
import { ResizeProvider } from './providers/ResizeProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'resize',
    ],
    __commands__: [
        [ 'resize.element', ResizeElementCommand ],
    ],
    __behaviors__: [
        [ 'resize.element', ResizeElementBehavior ],
    ],

    resize: [ 'type', ResizeProvider ],
};
