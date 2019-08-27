import { Provider } from '../../../core/Provider';


export class SimulationManager extends Provider {

    constructor (exporter) {
        super();
        this.exporter = exporter;
        this.formalisms = {};
        this.activeFormalism = null;
    }

    getNetInstance () {
        return this.exporter.getExport();
    }

    getFormalism (formalismId) {
        return this.formalisms[formalismId];
    }

    addFormalism (formalism) {
        this.formalisms[formalism.id] = formalism;
        this.emitFormalismUpdate();
    }

    deleteFormalism (formalismId) {
        delete this.formalisms[formalismId];
        this.emitFormalismUpdate();
    }

    emitFormalismUpdate () {
        this.eventBus.fire('formalism.update', {
            formalisms: Object.values(this.formalisms),
        });
    }

    initSimulation (formalismId) {
        this.activeFormalism = this.getFormalism(formalismId);
    }

}
