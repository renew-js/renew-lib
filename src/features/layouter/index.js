import MetaFormalismModule from '../meta-formalism';
import { MetaLayouter } from './providers/MetaLayouter';


export default {
    __depends__: [
        MetaFormalismModule,
    ],
    __init__: [
        'layouter',
    ],
    layouter: [ 'type', MetaLayouter ],
};
