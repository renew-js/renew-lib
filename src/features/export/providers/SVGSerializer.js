export class SVGSerializer {

    constructor () {
        this.xmlSerializer = new XMLSerializer();
    }

    serialize (data) {
        const ns = 'http://www.w3.org/2000/svg';
        // const doc = document.implementation.createDocument(ns, 'svg', null);
        // doc.documentElement.appendChild(data);
        const doc = document.createElementNS(ns, 'svg');
        doc.appendChild(data);

        const payload = this.xmlSerializer.serializeToString(doc);

        const mimeType = 'image/svg+xml';
        const fileExtension = '.svg';
        return { payload, mimeType, fileExtension };
    }

}
