export class BaseShapesContextPad {
    constructor (modeling, contextPad) {
        this.modeling = modeling;
        this.contextPad = contextPad;

        contextPad.registerProvider(this);
    }

    getContextPadEntries (element) {
        return {
            'delete': {
                group: 'edit',
                className: 'context-pad-icon-remove',
                title: 'Remove',
                action: {
                    click: () => this.modeling.removeElements([element]),
                },
            },
        };
    }
}
