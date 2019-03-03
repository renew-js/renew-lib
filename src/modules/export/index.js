import MetaModelingModule from '../meta-modeling';

import BaseExporter from './BaseExporter';
import JsonExporter from './JsonExporter';


export default {
    __depends__: [
        MetaModelingModule,
    ],
    __init__: [
        'baseExporter',
        'jsonExporter',
    ],
    baseExporter: [ 'type', BaseExporter ],
    jsonExporter: [ 'type', JsonExporter ],
};
