import { Tester } from '../../Tester';
import TestModule from './test';


describe('modules/commandStack - CommandStack', () => {
    let diagram;
    let commandStack;
    let test;

    beforeEach(() => {
        diagram = new Tester({ modules: [ TestModule ] });
        commandStack = diagram.get('commandStack');
        test = diagram.get('test');
    });

    it('should be defined', () => {
        expect(commandStack).toBeDefined();
    });

    describe('Provider', () => {

        it('should execute a command', function () {
            expect(commandStack._stack.length).toBe(0);
            expect(test.count).toBe(0);

            commandStack.execute('test.command');

            expect(commandStack._stack.length).toBe(1);
            expect(test.count).toBe(1);
        });

        it('should revert a command', function () {
            commandStack.execute('test.command');
            commandStack.undo();

            expect(commandStack._stack.length).toBe(1);
            expect(test.count).toBe(0);
        });

        it('should redo a command', function () {
            commandStack.execute('test.command');
            commandStack.undo();
            commandStack.redo();

            expect(commandStack._stack.length).toBe(1);
            expect(test.count).toBe(1);
        });

        it('should discard reverted commands', function () {
            commandStack.execute('test.command');
            commandStack.execute('test.command');
            commandStack.execute('test.command');
            commandStack.execute('test.command');

            expect(commandStack._stack.length).toBe(4);
            expect(test.count).toBe(4);

            commandStack.undo();
            commandStack.undo();
            commandStack.undo();
            commandStack.undo();

            expect(commandStack._stack.length).toBe(4);
            expect(test.count).toBe(0);

            commandStack.execute('test.command');

            expect(commandStack._stack.length).toBe(1);
            expect(test.count).toBe(1);
        });
    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => {
            eventBus = diagram.get('eventBus');
        });

        it('should undo a command on command.undo', function () {
            commandStack.execute('test.command');

            eventBus.fire('command.undo');

            expect(commandStack._stack.length).toBe(1);
            expect(test.count).toBe(0);
        });

        it('should redo a command on command.redo', function () {
            commandStack.execute('test.command');
            commandStack.execute('test.command');

            eventBus.fire('command.undo');
            eventBus.fire('command.undo');
            eventBus.fire('command.redo');

            expect(commandStack._stack.length).toBe(2);
            expect(test.count).toBe(1);
        });
    });

});
