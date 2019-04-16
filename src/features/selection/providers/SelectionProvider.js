import Selection from 'diagram-js/lib/features/selection/Selection';
import { getBBox } from 'diagram-js/lib/util/Elements';


export class SelectionProvider extends Selection {

    constructor (eventBus, selectionHandles) {
        super(eventBus);
        this.eventBus = eventBus;
        this.selectionHandles = selectionHandles;
        this.bbox = {};

        this.selectionHandles.create(this.bbox);
    }

    clear () {
        this.select(null);
        this.updateBBox();
        this._selectedElements = [];
    }

    empty () {
        return !this.count();
    }

    count () {
        return this._selectedElements.length;
    }

    add (elements) {
        elements = Array.isArray(elements) ? elements : [ elements ];
        elements.forEach((element) => {
            if (this.isSelectable(element)) {
                this.select(element, true);
                this.updateBBox();
            }
        });
    }

    remove (elements) {
        elements = Array.isArray(elements) ? elements : [ elements ];
        elements.forEach((element) => {
            if (this.isSelectable(element)) {
                this.deselect(element);
                this.updateBBox();
            }
        });
    }

    select (elements, append) {
        elements = Array.isArray(elements) ? elements : [ elements ];
        elements = elements.filter((element) => element);
        let newSelection = this._selectedElements;
        const oldSelection = newSelection.slice();

        if (append) {
            elements.forEach((element) => {
                if (!newSelection.includes(element)
                    && this.isSelectable(element)) {
                    newSelection.push(element);
                }
            });
        } else {
            this._selectedElements = newSelection = elements.slice();
        }
        this.updateBBox();

        this.eventBus.fire('selection.changed', {
            oldSelection,
            newSelection,
        });
    }

    isSelectable (element) {
        return [
            'shape',
            'connection',
            'label',
        ].includes((element || {}).type);
    }

    updateBBox () {
        this.selectionHandles.hide();

        const bbox = getBBox(this.get());
        this.bbox.x = bbox.x - 6;
        this.bbox.y = bbox.y - 6;
        this.bbox.width = bbox.width + 12;
        this.bbox.height = bbox.height + 12;

        if (!this.empty()) {
            this.selectionHandles.show();
        }
    }

}

SelectionProvider.$inject = undefined;
