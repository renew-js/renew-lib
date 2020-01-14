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
        return super.getAll();
    }

    add (element, gfx, secondaryGfx) {
        super.add(element, gfx, secondaryGfx);
    }

    remove (element) {
        super.remove(element);
    }

}
