export class EditProvider {

    constructor (commandStack, directEditing) {

        this.commandStack = commandStack;
        this.directEditing = directEditing;
        this.directEditing.registerProvider(this);

        this.label = null;
        this.booldefaultTextstyleChanged = false;

        this.boolDblClickedItalicActive = false;
        this.boolDblClickedBoldActive = false;
        this.boolDblClickedUnderlineActive = false;
        this.boolDblClickedAlignCenter = false;
        this.boolDblClickedAlignLeft = false;
        this.boolDblClickedAlignRight = false;

    }

    isActive () {
        return this.directEditing.isActive();
    }

    getDefaultTextAlign () {
        const defaultAlign = 'center-middle'; // left-middle, right-middle
        return defaultAlign;
    }


    activate (context) {
        const element = context.element;
        this.label = element;
        this.label.options = {
            align: this.getTextAlign(),
            box: {
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
            },
            bounds: {
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
            },
            style: this.getTextStyle(),
            text: element.text,
            options: {
                forceUpdate: true,
                resizable: true,
                centerVertically: true,
                autoActivate: true,
            },
        };

        return this.label.options;
    }

    getTextStyle () {
        this.checkIfTextstyleChanged();
        const textStyle = this.getDefaultTextstlye();
        console.log(textStyle);
        if (!this.checkIfTextstyleChanged()) {
            return textStyle;
        }
        if (this.checkIfTextstyleChanged() && this.boolDblClickedBoldActive) {
            textStyle['font-weight'] = 'bold';
        }
        if (this.checkIfTextstyleChanged() && this.boolDblClickedItalicActive) {
            textStyle['font-style'] = 'italic';
            console.log(textStyle);
        }
        if (this.checkIfTextstyleChanged() &&
            this.boolDblClickedUnderlineActive) {
            textStyle['text-decoration'] = 'underline';
        }
        return textStyle;
    }

    getDefaultTextstlye () {
        const defaultTextStyle = {
            border: '2px dashed #ccc',
            ['font-family']: 'sans-serif',
            ['font-weight']: 'normal',
            ['text-decoration']: 'normal',
            ['font-size']: '12px',
            fill: '#000',
            ['font-style']: 'regular',
        };
        return defaultTextStyle;
    }

    checkIfTextstyleChanged () {
        if (this.boolDblClickedBoldActive === false &&
            this.boolDblClickedItalicActive === false &&
            this.boolDblClickedUnderlineActive === false) {
            this.booldefaultTextstyleChanged = false;
        } else {
            this.booldefaultTextstyleChanged = true;
        }
        console.log(this.booldefaultTextstyleChanged);
        return this.booldefaultTextstyleChanged;
    }

    getTextAlign () {
        if (this.boolDblClickedAlignLeft) {
            const leftAlign = 'left-middle'; // left-middle, right-middle
            return leftAlign;
        } else if (this.boolDblClickedAlignRight) {
            const centerAlign = 'right-middle'; // left-middle, right-middle
            return centerAlign;
        } else if (this.boolDblClickedAlignCenter) {
            const rightAlign = 'center-middle'; // left-middle, right-middle
            return rightAlign;
        } else {
            return this.getDefaultTextAlign();
        }
    }

    setDblClickedActivationBool (attribute) {
        console.log('successfully reached here', attribute);
        const res = attribute.split(':');
        console.log(res);
        if (res[0]==='font-style') {
            if (this.boolDblClickedItalicActive) {
                this.boolDblClickedItalicActive= false;
                console.log('here');
            } else {
                this.boolDblClickedItalicActive=true;
                console.log('here');
            }
        }

        if (res[0]==='font-weight') {
            if (this.boolDblClickedBoldActive) {
                this.boolDblClickedBoldActive= false;
                console.log('here');
            } else {
                this.boolDblClickedBoldActive=true;
                console.log('here');
            }
        }

        if (res[0]==='text-decoration') {
            if (this.boolDblClickedUnderlineActive) {
                this.boolDblClickedUnderlineActive= false;
                console.log('here');
            } else {
                this.boolDblClickedUnderlineActive=true;
                console.log('here');
            }
        }

        if (res[0]==='align' && res[1]==='center-middle') {
            if (this.boolDblClickedAlignCenter) {
                this.boolDblClickedAlignCenter= false;
                console.log('here');
            } else {
                this.boolDblClickedAlignCenter=true;
                this.boolDblClickedAlignRight=false;
                this.boolDblClickedAlignLeft=false;
                console.log('here');
            }
        }

        if (res[0]==='align' && res[1]==='right-middle') {
            if (this.boolDblClickedAlignRight) {
                this.boolDblClickedAlignRight= false;
                console.log('here');
            } else {
                this.boolDblClickedAlignRight=true;
                this.boolDblClickedAlignCenter=false;
                this.boolDblClickedAlignLeft=false;
                console.log('here');
            }
        }

        if (res[0]==='align' && res[1]==='left-middle') {
            if (this.boolDblClickedAlignLeft) {
                this.boolDblClickedAlignLeft= false;
                console.log('here');
            } else {
                this.boolDblClickedAlignLeft=true;
                this.boolDblClickedAlignRight=false;
                this.boolDblClickedAlignCenter=false;
                console.log('here');
            }
        }

        console.log('italic?', this.boolDblClickedItalicActive);
        console.log('bold?', this.boolDblClickedBoldActive);
        console.log('underline?', this.boolDblClickedUnderlineActive);
        console.log('center?', this.boolDblClickedAlignCenter);
        console.log('left?', this.boolDblClickedAlignLeft);
        console.log('right?', this.boolDblClickedAlignRight);

    }

    update (element, text, old, bounds) {
        this.commandStack.execute('edit.label', {
            label: this.label,
            text: text,
            old: old,
            bounds: bounds,
        });
    }

    focus () {
        const editingContent = this.directEditing._textbox.parent.firstChild;
        if (!editingContent.innerHTML) {
            editingContent.innerHTML = '<br>';
        }
        editingContent.focus();
        editingContent.focus();
    }

}
