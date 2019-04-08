import SelectionModule from '../selection';

import { KeypressBehavior } from './behaviors/KeypressBehavior';
import { RemoveElementsBehavior } from './behaviors/RemoveElementsBehavior';
import { RemoveElementsCommand } from './commands/RemoveElementsCommand';
import { RemoveProvider } from './providers/RemoveProvider';


export default {
    __depends__: [
        SelectionModule,
    ],
    __init__: [
        'remove',
    ],
    __behaviors__: [
        [ 'keypress', KeypressBehavior ],
        [ 'remove.elements', RemoveElementsBehavior ],
    ],
    __commands__: [
        [ 'remove.elements', RemoveElementsCommand ],
    ],

    remove: [ 'type', RemoveProvider ],
};
