/**
 * Provide palette items for basic editor tools
 */
export class BaseToolsPalette {

    /**
     * @param  {object} lassoTool
     * @param  {object} palette
     * @param  {Toolbox} toolbox
     */
    constructor (lassoTool, palette, toolbox) {
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
                className: 'palette-icon-hand-tool',
                title: 'Activate the hand tool',
                action: {
                    click: (event) => {
                        this.toolbox.activate('pointer', event);
                    },
                },
            },
            'lasso-tool': {
                group: 'tools',
                className: 'palette-icon-lasso-tool',
                title: 'Activate Lasso Tool',
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
