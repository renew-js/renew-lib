import { ResizeElementBehavior } from './behaviors/ResizeElementBehavior';
import { ResizeElementCommand } from './commands/ResizeElementCommand';
import { ResizeProvider } from './providers/ResizeProvider';
import { ResizeElementRule } from './rules/ResizeElementRule';


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
    __rules__: [
        [ 'resize.element', ResizeElementRule ],
    ],

    resize: [ 'type', ResizeProvider ],
};
