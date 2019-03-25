import MetaFormalismModule from '../meta-formalism';

import BaseExporter from './BaseExporter';
import JsonExporter from './JsonExporter';


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
