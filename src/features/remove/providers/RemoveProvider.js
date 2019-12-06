import { Provider } from '../../../core/Provider';


export class RemoveProvider extends Provider {

    elements (elements) {
        this.commandStack.execute('remove.elements', { elements: elements });
    }

}
