import { remove } from 'tiny-svg';


export class CreateProvider {

    constructor (canvas, styles, graphicsFactory) {
        this.factory = null;
        this.preview = null;
        this.config = null;
    }

    clearPreview () {
        if (this.preview) {
            remove(this.preview);
            this.preview = null;
        }
    }

}
