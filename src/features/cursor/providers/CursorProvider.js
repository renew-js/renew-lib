import { Provider } from '../../../core/Provider';


export class CursorProvider extends Provider {

    set (type) {
        document.body.style.cursor = type;
    }

    unset () {
        document.body.style.cursor = 'default';
    }

}
