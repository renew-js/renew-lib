import { DisableBehavior } from './behaviors/DisableBehavior';
import { EnableBehavior } from './behaviors/EnableBehavior';
import { Create } from './providers/Create';
import { MouseDownBehavior } from './behaviors/MouseDownBehavior';
import { MouseUpBehavior } from './behaviors/MouseUpBehavior';
import { MouseMoveBehavior } from './behaviors/MouseMoveBehavior';


export default {
    __depends__: [

    ],
    __init__: [
        'create',
    ],
    __commands__: [
//        [ '', CreateElementCommand ],
    ],
    __behaviors__: [
        [ 'tool.create.enable', 1500, EnableBehavior ],
        [ 'tool.create.disable', 1500, DisableBehavior ],
        [ 'tool.create.onMouseDown', 1500, MouseDownBehavior ],
        [ 'tool.create.onMouseMove', 1500, MouseMoveBehavior ],
        [ 'tool.create.onMouseUp', 1500, MouseUpBehavior ],
//        [ 'tool.create', 1500, CreateBehavior ],
//        [ 'create.preview', 1500, PreviewBehavior ],
    ],
    create: [ 'type', Create ],
};
