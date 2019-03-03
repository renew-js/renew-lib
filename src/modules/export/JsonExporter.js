export default class JsonExporter {

    constructor (baseExporter) {
        this.baseExporter = baseExporter;
    }

    /**
     * Get JSON export
     * @param  {object} additionalFields Additional fields for JSON object
     * @return {string}                  The export data
     */
    getExport (additionalFields = {}) {
        const data = this.baseExporter.getExport();
        return JSON.stringify(Object.assign(data, additionalFields), null, 2);
    }

}
