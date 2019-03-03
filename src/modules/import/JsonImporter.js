import BaseImporter from './BaseImporter';


export default class JsonImporter {

    constructor (baseImporter) {
        this.baseImporter = baseImporter;
    }

    /**
     * Import JSON
     * @param  {string} json The import data
     * @return {object}      The parsed import data
     */
    import (json) {
        const data = JSON.parse(json);
        this.baseImporter.import(data);
        return data;
    }

}
