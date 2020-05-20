import {getParent, types} from 'mobx-state-tree';
import {SmallCube} from './SmallCube';
import {MatrixType} from './MatrixType';
import {Face} from './Face';
import {TwistDirectionInfo, TwistFaces} from '../TwistData';

export const RootStore = types.model({
    smallCubes: types.array(SmallCube),
    downX: types.maybeNull(types.number),
    downY: types.maybeNull(types.number),
    matrix: types.maybeNull(MatrixType),
    twistFaces: types.array(types.reference(Face)),
    isTwisting: types.optional(types.boolean, false),
    gameStarted: types.optional(types.boolean, false)
}).actions(self => ({
    startGame() {
        self.gameStarted = true;
    },
    rotateCube(loc) {
        if (self.downY != null && self.downX !== null) {
            self.rotateYAxis(loc.y);
            self.rotateXAxis(loc.x);
            self.setRotateFromPosition(loc);
        }
    },
    rotateYAxis(y) {
        const yAngle = self.downY - y,
            {m11, m21, m31} = self.matrix;
        self.matrix = self.matrix.rotateAxisAngle(m11, m21, m31, yAngle);
    },
    rotateXAxis(x) {
        const xAngle = x - self.downX,
            {m12, m22, m32} = self.matrix;
        self.matrix = self.matrix.rotateAxisAngle(m12, m22, m32, xAngle);
    },
    setRotateFromPosition(loc) {
        self.downX = loc.x;
        self.downY = loc.y;
    },
    stopRotate() {
        self.downX = null;
        self.downY = null;
    },
    twistIfSelection() {
        if (self.twistFaces.length > 1) {
            self.doTwist();
            return true;
        }
    },
    doTwist() {
        const twistDimension = getTwistDimension(self.twistFaces),
            twistRow = getTwistRow(self.twistFaces, twistDimension),
            direction = getTwistDirection(self.twistFaces, twistDimension),
            cubes = self.getCubes(twistDimension, twistRow);

        self.isTwisting = true;
        cubes.forEach(cube => cube.twist(twistDimension, direction));
    },
    endTwist() {
        self.isTwisting = false;
    },
    getCubes(twistDimension, twistRow) {
        return self.smallCubes.filter(cube => cube[twistDimension + 'Row'] === twistRow);
    },
    deselectTwistFaces() {
        self.twistFaces.map(face => face.setSelected(false));
        self.twistFaces.clear();
    },
    deselectFacesIfAtStart(face) {
        if (self.twistFaces.length > 1 && self.twistFaces[0] === face) {
            self.deselectTwistFaces();
            self.addTwistFace(face);
        }
    },
    startTwist(face) {
        if(!self.isTwisting) {
            self.deselectTwistFaces();
            self.addTwistFace(face);
        }
    },
    addAnotherTwistFaceIfAllowed(face) {
        if (self.twistFaces.length !== 0 && notAlreadyInFaces(face, self.twistFaces) && inSameRowAsOthers(face, self.twistFaces)) {
            self.addTwistFace(face)
        }
    },
    addTwistFace(face) {
        face.setSelected(true);
        self.twistFaces.push(face);
    }
}));

function getTwistDirection(faces, dimension) {
    const face1 = faces[0],
        face2 = faces[1];
    return face1.position !== face2.position ? getDirectionByFace(face1, face2, dimension) : getDirectionByCube(face1, face2, dimension);
}

function getDirectionByFace(face1, face2, dimension) {
    const order = TwistFaces[dimension],
        face1Idx = order.indexOf(face1.position),
        face2Idx = order.indexOf(face2.position),
        lastItem = order.length - 1;

    return (face1Idx === lastItem && face2Idx === 0) || (face2Idx - face1Idx === 1) ? 1 : -1;
}

function getDirectionByCube(face1, face2, dimension) {
    const isDecreasing = TwistDirectionInfo[dimension][face1.position] === -1,
        differingDimension = getDifferingDimension(face1, face2),
        value1 = getRowValue(face1, differingDimension),
        value2 = getRowValue(face2, differingDimension);

    return (isDecreasing && value1 > value2) || (!isDecreasing && value1 < value2) ? 1 : -1;
}

function getRowValue(face, dimension) {
    return getCube(face)[dimension + 'Row'];
}

function notAlreadyInFaces(face) {
    return !face.isSelected;
}

function inSameRowAsOthers(face, faces) {
    return allAreOnX(face, faces) || allAreOnY(face, faces) || allAreOnZ(face, faces);

}

function allAreOnX(face, faces) {
    return areAllOnDimension(face, faces, 'x');
}

function allAreOnY(face, faces) {
    return areAllOnDimension(face, faces, 'y');
}

function allAreOnZ(face, faces) {
    return areAllOnDimension(face, faces, 'z');
}

function areAllOnDimension(face, faces,dimension) {
    for (let i = 1; i < faces.length; i++) {
        if(!isTwistOnDimension(faces[i - 1], faces[i], dimension)){
            return false;
        }
    }
    return isTwistOnDimension(face, faces[0], dimension);
}

function getCube(face) {
    return getParent(face, 2);
}

function isTwistOnX(face1, face2) {
    return isTwistOnDimension(face1, face2, 'x');
}

function isTwistOnY(face1, face2) {
    return isTwistOnDimension(face1, face2, 'y');
}

function isTwistOnDimension(face1, face2, dimension) {
    return isSameRow(face1, face2, dimension) && TwistFaces[dimension].indexOf(face1.position) !== -1 && TwistFaces[dimension].indexOf(face2.position) !== -1;
}

function isSameRow(face1, face2, dimension) {
    const cube1 = getCube(face1),
        cube2 = getCube(face2);

    const field = dimension + 'Row';
    return cube1[field] === cube2[field]
}

function getTwistDimension(faces) {
    return isTwistOnX(faces[0], faces[1]) ? 'x' :
        isTwistOnY(faces[0], faces[1]) ? 'y' : 'z';
}

function getDifferingDimension(face1, face2) {
    return !isSameRow(face1, face2, 'x') ? 'x' :
        !isSameRow(face1, face2, 'y') ? 'y' : 'z';
}

function getTwistRow(faces, dimension) {
    const cube = getCube(faces[0]);
    return cube[dimension + 'Row'];
}