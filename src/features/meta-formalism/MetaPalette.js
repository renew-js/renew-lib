/**
 *
 */
export class MetaPalette {
    /**
     * @param {Object} create
     * @param {Object} elementFactory
     * @param {Object} palette
     */
    constructor (create, elementFactory, palette) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.palette = palette;

        this.metaPaletteEntries = {};
    }

    /**
     * @return {{}}
     */
    getPaletteEntries () {
        return this.metaPaletteEntries;
    }


    /**
     * @param {Plugin} plugin
     */
    addFormalism (plugin) {
        this.parseMetaModel(plugin.getMetaModel());
        this.parseStylesheet(plugin.getStylesheet());
        this.parseToolConfiguration(plugin.getToolConfiguration());

        this.palette.registerProvider(this);
    }

    /**
     * @param {MetaModel} metaModel
     */
    parseMetaModel (metaModel) {
        metaModel.classifiers.forEach((classifier) => {
            this.metaPaletteEntries[classifier.type] = {
                group: metaModel.type,
                title: 'Create ' + classifier.type,
            };
        });
    }

    /**
     * @param {Stylesheet} stylesheet
     */
    parseStylesheet (stylesheet) {
        stylesheet.classifierStyles.forEach((classifierStyle) => {
            this.metaPaletteEntries[classifierStyle.targetType].action = {
                click: (event) => {
                    const shape = this.elementFactory.createShape({
                        width: classifierStyle.defaultDimension.width,
                        height: classifierStyle.defaultDimension.height,
                    });
                    this.create.start(event, shape);
                },
            };
        });
    }

    /**
     * @param {ToolConfiguration} toolConfiguration
     */
    parseToolConfiguration (toolConfiguration) {

    }
}
