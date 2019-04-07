import Formalism from 'renew-formalism';


export class TestPlugin extends Formalism.Plugin {

    constructor () {
        super();
        this.type = 'test';
    }

    getMetaModel () {
        return Formalism.Ontology.MetaModel.fromJson({
            type: 'test',
            classifiers: [
                {
                    type: 'classifier_1',
                    labels: [ 'label_1' ],
                },
                {
                    type: 'classifier_2',
                    labels: [ 'label_1' ],
                },
            ],
            relations: [
                {
                    type: 'relation_1',
                    labels: [ 'label_1' ],
                },
            ],
        });
    }

    getStylesheet () {
        return Formalism.Ontology.Stylesheet.fromJson({
            'classifier-styles': [
                {
                    'target-type': 'classifier_1',
                    'default-dimension': {
                        width: 30,
                        height: 40,
                    },
                },
                {
                    'target-type': 'classifier_1',
                    'default-dimension': {
                        width: 25,
                        height: 50,
                    },
                },
            ],
            'relation-styles': [
                {
                    'target-type': 'relation_1',
                    'line-color': 'blue',
                    'line-width': 3,
                    'line-style': 'normal-line',
                },
            ],
            'arrow-head-styles': [],
            'text-styles': [],
        });
    }

    getToolConfiguration () {
        return Formalism.Ontology.ToolConfiguration.fromJson({
            'tool-name': 'Test Editor',
            'target-model': 'test',
            'file-description': 'Test Model',
            'file-extension': 'tst',
            'tool-mappings': [
                {
                    'target-type': 'classifier_1',
                    'tool-title': 'Classifier_1 tool',
                },
                {
                    'target-type': 'classifier_2',
                    'tool-title': 'Classifier_2 tool',
                },
                {
                    'target-type': 'relation_1',
                    'tool-title': 'Relation_1 tool',
                },
            ],
        });
    }

    getSerializer (format) {
        return {
            serialize: (data) => data,
        };
    }

    getParser (format) {
        return {
            parse: (data) => data,
        };
    }

}
