import BaseElementRegistry from 'diagram-js/lib/core/ElementRegistry';


export class ElementRegistry extends BaseElementRegistry {

    constructor (props) {
        super(props);
    }

    /**
     * TODO: Remove hotfix for handles
     * @return {*}[]
     */
    getAll () {
        return super.getAll().filter((element) => element.type !== 'handle');
    }

}
