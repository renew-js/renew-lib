export class CursorProvider {

    constructor () {

    }

    set (type) {
        document.body.style.cursor = type;
    }

    unset () {
        document.body.style.cursor = 'default';
    }

}
