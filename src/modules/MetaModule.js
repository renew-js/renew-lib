import {MetaContextPad} from '../context-pads/MetaContextPad';
import {MetaPalette} from '../palettes/MetaPalette';
import {MetaRules} from '../rules/MetaRules';


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
