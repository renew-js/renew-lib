/**
 * Provide palette items for basic editor tools
 */
export class BaseToolsPalette {

    /**
     * @param  {object} palette
     * @param  {Toolbox} toolbox
     */
    constructor (palette, toolbox) {
        this.palette = palette;
        this.toolbox = toolbox;

        palette.registerProvider(this);
    }

    /**
     * @return {object} Palette entries
     */
    getPaletteEntries () {
        return {
            'hand-tool': {
                group: 'tools',
                className: 'palette-icon-pointer-tool',
                title: 'Activate pointer tool',
                action: {
                    click: (event) => {
                        this.toolbox.activate('pointer', event);
                    },
                },
            },
            'lasso-tool': {
                group: 'tools',
                className: 'palette-icon-hand-tool',
                title: 'Activate hand tool',
                action: {
                    click: (event) => {
                        this.toolbox.activate('hand', event);
                    },
                },
            },
            'base-tools-separator': {
                group: 'tools',
                separator: true,
            },
        };
    }

}
