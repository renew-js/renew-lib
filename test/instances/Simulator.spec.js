import Simulator from '../../src/Simulator';


describe('instances/simulator - Simulator', () => {
    let simulator;

    beforeEach(() => {
        simulator = new Simulator();
    });

    it('should be defined', function () {
        expect(simulator).toBeDefined();
    });
});
