import { DisableBehavior } from './behaviors/DisableBehavior';
import { EnableBehavior } from './behaviors/EnableBehavior';
import { Create } from './providers/Create';


export default {
    __depends__: [

    ],
    __init__: [
        create
    ],
    __commands__: [
//        [ '', CreateElementCommand ],
    ],
    __tools__: {

    },
    __behaviors__: [
        [ 'create.enable', 1500, EnableBehavior ],
        [ 'create.disable', 1500, DisableBehavior ],
//        [ 'tool.create', 1500, CreateBehavior ],
//        [ 'create.preview', 1500, PreviewBehavior ],
    ],
    create: [ 'type', Create ],
};
