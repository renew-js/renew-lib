export class BaseShapesContextPad {
    constructor (contextPad) {
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
                    // click: () => this.modeling.removeElements([element]),
                },
            },
        };
    }
}
