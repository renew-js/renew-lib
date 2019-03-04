/**
 * Provide palette items for basic editor tools
 */
export class BaseToolsPalette {
    /**
     * @param  {object} lassoTool
     * @param  {object} handTool
     * @param  {object} globalConnect
     * @param  {object} palette
     */
    constructor (lassoTool, handTool, globalConnect, palette) {
        this.lassoTool = lassoTool;
        this.handTool = handTool;
        this.globalConnect = globalConnect;
        this.palette = palette;

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
                        this.handTool.activateHand(event);
                    },
                },
            },
            'lasso-tool': {
                group: 'tools',
                className: 'palette-icon-lasso-tool',
                title: 'Activate Lasso Tool',
                action: {
                    click: (event) => {
                        this.lassoTool.activateSelection(event);
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
