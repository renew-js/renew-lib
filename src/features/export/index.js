import MetaFormalismModule from '../meta-formalism';

import BaseExporter from './providers/BaseExporter';
import JsonExporter from './providers/JsonExporter';


export default {
    __depends__: [
        MetaFormalismModule,
    ],
    __init__: [
        'baseExporter',
        'jsonExporter',
    ],
    baseExporter: [ 'type', BaseExporter ],
    jsonExporter: [ 'type', JsonExporter ],
};
