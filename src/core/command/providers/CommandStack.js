import DiagramJsCommandStack from 'diagram-js/lib/command/CommandStack';


export class CommandStack extends DiagramJsCommandStack {

    constructor (eventBus, injector) {
        super(eventBus, injector);
    }

    execute (command, context) {
        if (!command) {
            throw new Error('command required');
        }

        const action = { command, context, handler: this._getHandler(command) };

        if (this.canExecute(command, context, action)) {
            this._pushAction(action);
            this._internalExecute(action);
            this._popAction(action);
        }
    }

    canExecute (command, context, action) {
        if (!action) {
            action = { command, context, handler: this._getHandler(command) };
        }

        let result = this._fire(command, 'canExecute', action);

        if (result === undefined) {
            if (!action.handler) {
                return false;
            }

            if (action.handler.canExecute) {
                result = action.handler.canExecute(context);
            }
        }

        return result;
    }

    _internalUndo (action) {
        const command = action.command;
        const context = action.context;
        const handler = action.handler;

        this._atomicDo(() => {
            this._fire(command, 'revert', action);

            if (handler.revert) {
                this._markDirty(handler.revert(context));
            }

            this._revertedAction(action);
            this._fire(command, 'reverted', action);
        });
    }

    _internalExecute (action, redo) {
        const command = action.command;
        const context = action.context;
        const handler = action.handler;

        if (!handler) {
            const e = 'no command handler registered for <' + command + '>';
            throw new Error(e);
        }

        this._pushAction(action);

        if (!redo) {
            this._fire(command, 'preExecute', action);

            if (handler.preExecute) {
                handler.preExecute(context);
            }

            this._fire(command, 'preExecuted', action);
        }

        this._atomicDo(() => {
            this._fire(command, 'execute', action);

            if (handler.execute) {
                this._markDirty(handler.execute(context));
            }

            this._executedAction(action, redo);
            this._fire(command, 'executed', action);
        });

        if (!redo) {
            this._fire(command, 'postExecute', action);

            if (handler.postExecute) {
                handler.postExecute(context);
            }

            this._fire(command, 'postExecuted', action);
        }

        this._popAction(action);
    }

    registerHandler (command, handlerCls) {
        this._setHandler(command, handlerCls);
    }

    _getHandler (command) {
        return this._injector.instantiate(this._handlerMap[command]);
    }

}
