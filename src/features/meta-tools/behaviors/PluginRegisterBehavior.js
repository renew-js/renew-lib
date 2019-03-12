import { Behavior } from '../../../core/eventBus/Behavior';


export class PluginRegisterBehavior extends Behavior {

    constructor (eventBus, palette, metaPalette) {
        super();
        this.eventBus = eventBus;
        this.palette = palette;
        this.metaPalette = metaPalette;
    }

    after (context) {
        this.metaPalette.registerPlugin(context.plugin);
        this.palette.registerProvider(this.metaPalette);
    }

}
