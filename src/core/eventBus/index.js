import EventBus from './providers/EventBus';


export default {
    __depends__: [ ],
    __init__: [
        'eventBus',
    ],

    eventBus: [ 'type', EventBus ],
};
