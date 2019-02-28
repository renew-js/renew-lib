import { OrientationFactory } from './OrientationFactory';


export default {
    __depends__: [
    ],
    __init__: [
        'orientation',
    ],
    orientation: [ 'type', OrientationFactory ],
};
