import {MetaContextPad} from './MetaContextPad';
import {MetaPalette} from './MetaPalette';
import {MetaRules} from './MetaRules';


export default {
    __init__: [
        'metaContextPad',
        'metaPalette',
        'metaRules',
    ],
    metaContextPad: ['type', MetaContextPad],
    metaPalette: ['type', MetaPalette],
    metaRules: ['type', MetaRules],
};
