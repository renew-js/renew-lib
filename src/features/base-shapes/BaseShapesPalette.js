/**
 * Provide palette items for basic editor tools
 */
export class BaseShapesPalette {
    /**
     * @param  {object} create
     * @param  {object} elementFactory
     * @param  {object} palette
     */
    constructor (create, elementFactory, palette) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.palette = palette;

        palette.registerProvider(this);
    }

    /**
     * @return {object} Palette entries
     */
    getPaletteEntries () {
        return {
            'create-shape': {
                group: 'base-shapes',
                className: 'palette-icon-create-shape',
                title: 'Create Shape',
                action: {
                    click: (event) => {
                        const shape = this.elementFactory.createShape({
                            width: 100,
                            height: 80,
                        });

                        this.create.start(event, shape);
                    },
                },
            },
            'base-shapes-separator': {
                group: 'base-shapes',
                separator: true,
            },
        };
    }
}
