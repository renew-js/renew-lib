export class SVGSerializer {

    constructor () {
        this.xmlSerializer = new XMLSerializer();
    }

    serialize (data) {
        const payload = this.xmlSerializer.serializeToString(data);

        const mimeType = 'image/svg+xml';
        const fileExtension = '.svg';
        return { payload, mimeType, fileExtension };
    }

}
