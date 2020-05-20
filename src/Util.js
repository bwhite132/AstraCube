export const getXYFromEvent = function (e) {
    const isTouchEvent = typeof e.changedTouches !== 'undefined';
    return {
        x: isTouchEvent ? e.changedTouches[0].clientX : e.pageX,
        y: isTouchEvent ? e.changedTouches[0].clientY : e.pageY,
    }
};

//Ideally, I'd like to avoid interacting with the DOM, but due to the way touchmove works it seems to be simplest
//to convert touchmove to mousemove.  Touchmove always fires on the originating component, event if the user is no
//longer touching that component.  Mousemove will fire on the component the user is actually touching
export const fireMouseMove = function (e) {
    const loc = getXYFromEvent(e),
        el = document.elementFromPoint(loc.x, loc.y),
        mouseEvent = new MouseEvent('mousemove', {
            bubbles: true
        });

    if(el) {
        el.dispatchEvent(mouseEvent);
    }
};