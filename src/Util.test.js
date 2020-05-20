import {getXYFromEvent} from "./Util";

it("Can get x and y from mouse event", () => {
    const expectedX = Math.random() * 10,
        expectedY = Math.random() * 10,
        mouseEventMock = {
            pageX: expectedX,
            pageY: expectedY
        };

    const loc = getXYFromEvent(mouseEventMock);
    expect(loc.x).toBe(expectedX);
    expect(loc.y).toBe(expectedY);
});

it("Can get x and y from touch event", () => {
    const expectedX = Math.random() * 10,
        expectedY = Math.random() * 10,
        touchEventMock = {
            changedTouches: [{
                pageX: expectedX,
                pageY: expectedY
            }]
        };

    const loc = getXYFromEvent(touchEventMock);
    expect(loc.x).toBe(expectedX);
    expect(loc.y).toBe(expectedY);
});