export class SimulationManager {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.formalisms = {};
        this.activeFormalism = null;
    }

    addFormalism (formalism) {
        this.formalisms[formalism.id] = formalism;
        this.emitUpdate();
    }

    deleteFormalism (simulatorId) {
        delete this.formalisms[simulatorId];
        this.emitUpdate();
    }

    activateFormalism (simulatorId) {
        console.log('Formalism activated:', simulatorId);
        this.activeFormalism = this.formalisms[simulatorId];
    }

    emitUpdate () {
        this.eventBus.fire('formalisms.update', {
            formalisms: Object.values(this.formalisms),
        });
    }

}
