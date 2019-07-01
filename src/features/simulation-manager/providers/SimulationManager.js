export class SimulationManager {

    constructor (eventBus, exporter) {
        this.eventBus = eventBus;
        this.exporter = exporter;
        this.formalisms = {};
    }

    getData () {
        return this.exporter.getExport();
    }

    getFormalism (formalismId) {
        return this.formalisms[formalismId];
    }

    addFormalism (formalism) {
        this.formalisms[formalism.id] = formalism;
        this.emitUpdate();
    }

    deleteFormalism (formalismId) {
        delete this.formalisms[formalismId];
        this.emitUpdate();
    }

    emitUpdate () {
        this.eventBus.fire('formalisms.update', {
            formalisms: Object.values(this.formalisms),
        });
    }

    start (formalismId) {
        //
    }

}
