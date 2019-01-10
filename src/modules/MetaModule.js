import MetaContextPad from '../context-pads/MetaContextPad';
import MetaPalette from '../palettes/Metapalette';
import MetaRules from '../rules/MetaRules';


class MetaModule {
    __construct () {
        this.__init__ = [
            'metaContextPad',
            'metaPalette',
            'metaRules'
        ];

        this.metaContextPad = new MetaContextPad();
        this.metaPalette = new MetaPalette();
        this.metaRules = new MetaRules();
    }
}
