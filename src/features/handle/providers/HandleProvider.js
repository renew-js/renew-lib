import { Provider } from '../../../core/Provider';


export class HandleProvider extends Provider {

    constructor (handleFactory) {
        super();
        this.factory = handleFactory;
    }

    create (orientation, attributes) {
        return this.factory.createShape(Object.assign({},
            { orientation },
            attributes
        ));
    }

    show (handle) {
        const position = handle.orientation.position();
        handle.x = position.x - Math.round(handle.width / 2);
        handle.y = position.y - Math.round(handle.height / 2);
        handle.visible = true;
        this.canvas.addShape(handle);
    }

    hide (handle) {
        this.canvas.removeShape(handle);
        handle.visible = false;
    }

}
