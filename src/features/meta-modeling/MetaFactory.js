import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import { Classifier } from 'renew-formalism/src/ontology/metamodel/Classifier';
import { Relation } from 'renew-formalism/src/ontology/metamodel/Relation';


export class MetaFactory extends ElementFactory {
    constructor (eventBus, create, globalConnect) {
        super();
        this.eventBus = eventBus;
        this.dragging = create;
        this.connect = globalConnect;

        this.eventBus.on('metaPalette.create', this.onCreateElement.bind(this));
    }

    onCreateElement (event) {
        if (event.element instanceof Classifier) {
            this.onCreateClassifier(event);
        } else if (event.element instanceof  Relation) {
            this.onCreateRelation(event);
        }
    }

    onCreateClassifier (event) {
        const stylesheet = event.plugin.getStylesheet();

        let clone = (object) => JSON.parse(JSON.stringify(object));
        const shape = this.createShape({
            width: stylesheet.styles[event.element.type].defaultDimension.width,
            height: stylesheet.styles[event.element.type].defaultDimension.height,
            body: clone(stylesheet.styles[event.element.type].representation),
        });

        this.dragging.start(event.click, shape);
    }

    onCreateRelation (event) {
        this.connect.toggle();
    }
}
