class MetaPalette {

    constructor (create, elementFactory, lassoTool, palette) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.lassoTool = lassoTool;
        this.palette = palette;

        this.palette.registerProvider(this);
    }

    getPaletteEntries () {

    }

}
