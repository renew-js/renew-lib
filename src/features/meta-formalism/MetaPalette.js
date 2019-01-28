/**
 *
 */
export class MetaPalette {
    /**
     * @param {Object} create
     * @param {ElementFactory} elementFactory
     * @param {Object} palette
     * @param {GlobalConnect} globalConnect
     */
    constructor (create, elementFactory, palette, globalConnect) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.palette = palette;
        this.connect = globalConnect;

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
        const elements = metaModel.classifiers.concat(metaModel.relations);
        elements.forEach((element) => {
            this.metaPaletteEntries[element.type] = {
                group: metaModel.type,
            };
        });
    }

    /**
     * @param {Stylesheet} stylesheet
     */
    parseStylesheet (stylesheet) {
        stylesheet.classifierStyles.forEach((classifierStyle) => {
            const clone = (object) => JSON.parse(JSON.stringify(object));
            this.metaPaletteEntries[classifierStyle.targetType].action = {
                click: (event) => {
                    const shape = this.elementFactory.createShape({
                        width: classifierStyle.defaultDimension.width,
                        height: classifierStyle.defaultDimension.height,
                        body: clone(classifierStyle.representation),
                    });
                    this.create.start(event, shape);
                },
            };
        });
        stylesheet.relationStyles.forEach((relationStyle) => {
            this.metaPaletteEntries[relationStyle.targetType].action = {
                click: (event) => {
                    this.connect.toggle(event);
                },
            };
        });
    }

    /**
     * @param {ToolConfiguration} toolConfiguration
     */
    parseToolConfiguration (toolConfiguration) {
        toolConfiguration.toolMappings.forEach((mapping) => {
            this.metaPaletteEntries[mapping.targetType].imageUrl = mapping.icon;
            this.metaPaletteEntries[mapping.targetType].title = mapping.title;
        });
    }
}
