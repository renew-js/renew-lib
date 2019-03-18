import { SnappingProvider } from './providers/SnappingProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'snapping',
    ],
    snapping: [ 'type', SnappingProvider ],
};
