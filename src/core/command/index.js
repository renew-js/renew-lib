import CommandStack from 'diagram-js/lib/command/CommandStack';


export default {
    __depends__: [ ],
    __init__: [
        'commandStack'
    ],

    commandStack: [ 'type', CommandStack ],
};
