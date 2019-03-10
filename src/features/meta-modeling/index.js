import MetaFormalismModule from '../meta-formalism';
import ModelingModule from 'diagram-js/lib/features/modeling';
import GlobalConnectModule from 'diagram-js/lib/features/global-connect';

import { MetaModeling } from './MetaModeling';
import { MetaLayouter } from './MetaLayouter';


export default {
    __depends__: [
        MetaFormalismModule,
        ModelingModule,

        GlobalConnectModule,
    ],
    __init__: [
        'modeling',
        'layouter',
    ],
    modeling: [ 'type', MetaModeling ],
    layouter: [ 'type', MetaLayouter ],
};
