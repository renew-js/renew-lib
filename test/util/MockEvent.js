export function mousedown (diagram, position) {
    return diagram.invoke((canvas) => {
        const clientRect = canvas._container.getBoundingClientRect();
        const event = createEvent(diagram, canvas._svg, {
            x: position.x + clientRect.left,
            y: position.y + clientRect.top,
        });

        const mouseEvent = document.createEvent('MouseEvent');

        if (mouseEvent.initMouseEvent) {
            mouseEvent.initMouseEvent(
                'mousedown', true, true, window, 0, 0, 0,
                event.x, event.y, false, false, false, false, 0, null
            );
        }


        document.dispatchEvent(mouseEvent);

        return mouseEvent;
    });
}

export function createEvent (diagram, target, position) {

    return diagram.invoke((eventBus) => eventBus.createEvent({
        target: target,
        clientX: position.x,
        clientY: position.y,
        offsetX: position.x,
        offsetY: position.y,
    }));

}
