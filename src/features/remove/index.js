import { RemoveElementsBehavior } from './behaviors/RemoveElementsBehavior';
import { RemoveElementsCommand } from './commands/RemoveElementsCommand';
import { RemoveProvider } from './providers/RemoveProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'remove'
    ],
    __behaviors__: [
        [ 'remove.elements', RemoveElementsBehavior ]
    ],
    __commands__: [
        [ 'remove.elements', RemoveElementsCommand ]
    ],

    remove: [ 'type', RemoveProvider ],
}