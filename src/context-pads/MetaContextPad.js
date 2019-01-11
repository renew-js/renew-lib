class MetaContextPad {

    constructor (connect, contextPad, modeling) {
        this.connect = connect;
        this.modeling = modeling;

        contextPad.registerProvider(this);
    }

    getContextPadEntries (element) {

    }

}
