export class MetaPalette {

    constructor (create, elementFactory, lassoTool, palette) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.lassoTool = lassoTool;
        this.palette = palette;
    }

    getPaletteEntries () {

    }

    addFormalism (plugin) {
        this.palette.registerProvider(this);
    }

}
