import { Tool } from '../../../core/toolbox/Tool';


export class EditTool extends Tool {

    constructor (eventBus, toolbox, edit, directEditing) {
        super();
        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.edit = edit;
        this.directEditing = directEditing;
    }

    onDisable () {
        this.eventBus.fire('edit.complete');
    }

    onEnable (event) {
        this.eventBus.fire('edit.activate', { element: event.label });
    }

    onMouseDown (event) {
        if (this.edit.isActive() && event.hover !== null) {
            this.toolbox.activateDefault();
        }
    }

    onMouseUp (event) {
        const editingContent = this.directEditing._textbox.parent.firstChild;
        if (!editingContent.innerHTML) {
            editingContent.innerHTML = '<br>';
        }
        editingContent.focus();
    }

}
