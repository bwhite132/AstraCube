import {types} from 'mobx-state-tree';
import {Face} from './Face';

export const SmallCube = types.model({
    xRow: types.integer,
    yRow: types.integer,
    zRow: types.integer,
    twistDirection: types.optional(types.integer, 1),
    twistDimension: types.maybeNull(types.enumeration('Dimension',['x', 'y', 'z'])),
    faces: types.array(Face),
    isLightOn: types.optional(types.boolean, false)
}).actions(self => ({
    twist(dimension, direction) {
        self.twistDirection = direction;
        self.twistDimension = dimension;
        self.isLightOn = true;
    },
    hideLight() {
        self.isLightOn = false;
    },
    updatePosition() {
        const methodToCall = {
            x: self.updatePositionAfterTwistX,
            y: self.updatePositionAfterTwistY,
            z: self.updatePositionAfterTwistZ
        },
            numTwists = self.isTwistingForward() ? 1 : 3;

        times(numTwists, methodToCall[self.twistDimension]);
    },
    updatePositionAfterTwistX() {
        const nextY = self.zRow;
        self.zRow = getTransition(self.yRow);
        self.yRow = nextY;
    },
    updatePositionAfterTwistY() {
        const nextZ = self.xRow;
        self.xRow = getTransition(self.zRow);
        self.zRow = nextZ;
    },
    updatePositionAfterTwistZ() {
        const nextY = self.xRow;
        self.xRow = getTransition(self.yRow);
        self.yRow = nextY;
    },
    completeTwist() {
        self.updatePosition();
        self.updateFaces();
        self.twistDimension = null;
    },
    updateFaces() {
        self.faces.filter(face => face.shouldTwist(self.twistDimension)).map(face => face.twist(self.twistDimension, self.twistDirection));
    }
})).views(self => ({
    isTwistingForward() {
        return self.twistDirection === 1
    },
    getXRotate() {
        return self.getRotate('x');
    },
    getYRotate() {
        return self.getRotate('y');
    },
    getZRotate() {
        return self.getRotate('z');
    },
    getRotate(dimension) {
        return self.twistDimension === dimension ? 90 * self.twistDirection : 0;
    }
}));

function times(numTimes, method){
    for(let i = 0; i < numTimes; i++) {
       method();
    }
}

function getTransition(index) {
    const transitions = [2, 1, 0];
    return transitions[index];
}