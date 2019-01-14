import { MetaContextPad } from '../context-pads/MetaContextPad';
import { MetaPalette } from '../palettes/Metapalette';
import { MetaRules } from '../rules/MetaRules';


export default class MetaModule {

    constructor (plugin) {
        this.__init__ = [
            'metaContextPad',
            'metaPalette',
            'metaRules'
        ];

        this.metaContextPad = [ 'type', MetaContextPad ];
        this.metaPalette = [ 'type', MetaPalette ];
        this.metaRules = [ 'type', MetaRules ];
    }
}
