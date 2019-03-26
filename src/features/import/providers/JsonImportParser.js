export class JsonImportParser {

    constructor (elementFactory) {
        this.elementFactory = elementFactory;
    }

    /**
     * Import JSON
     * @param  {string} json The import data
     * @return {object}      The parsed import data
     */
    parse (json) {
        const data = JSON.parse(json) || {};
        data.elements = data.elements || [];
        data.elements = data.elements.map((element) => {
            delete element.labels;
            delete element.children;
            return this.elementFactory.create(element.type, element);
        });
        return data;
    }

}
