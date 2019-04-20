import { Tester } from '../../Tester';
import MetaFactoryModule from '../../../src/features/meta-factory';
import { TestPlugin } from '../../util/TestPlugin';


describe('modules/metaFactory - MetaFactory', () => {
    let diagram;
    let metaFactory;

    beforeEach(() => {
        diagram = new Tester({ modules: [ MetaFactoryModule ] });
        metaFactory = diagram.get('metaFactory');


        diagram.get('eventBus').fire('plugin.register', {
            plugin: new TestPlugin(),
        });
    });

    it('should be defined', () => expect(metaFactory).toBeDefined());

    describe('Provider', () => {

        it('should know its model', function () {
            const classifier = metaFactory.createElement('test:classifier_1');
            const relation = metaFactory.createElement('test:relation_1');
            const label = metaFactory.createElement('test:label_1');

            expect(classifier.model).toBe('test');
            expect(relation.model).toBe('test');
            expect(label.model).toBe('test');
        });

        it('should know its meta type', function () {
            const classifier = metaFactory.createElement('test:classifier_1');
            const relation = metaFactory.createElement('test:relation_1');
            const label = metaFactory.createElement('test:label_1');

            expect(classifier.metaType).toBe('classifier_1');
            expect(relation.metaType).toBe('relation_1');
            expect(label.metaType).toBe('label_1');
        });

    });

});
