import { Provider } from '../../../core/Provider';


export class SVGSerializer extends Provider {

    constructor () {
        super();
        this.xmlSerializer = new XMLSerializer();
    }

    serialize (data) {
        const payload = this.xmlSerializer.serializeToString(data);

        const mimeType = 'image/svg+xml';
        const fileExtension = '.svg';
        return { payload, mimeType, fileExtension };
    }

}
