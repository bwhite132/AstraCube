import {RootStore} from './RootStore';
import {generateCube} from '../InitialData';


describe('Game', () => {
    it('should start', () => {
        const store = RootStore.create({smallCubes: []});
        store.startGame();
        expect(store.gameStarted).toEqual(true);
    });
});

describe('Rotation', () => {
    it('should prevent rotating when down not clicked', () => {
        const store = RootStore.create({downY: null, downX: null});
        store.rotateCube({x: 1, y: 2});
        expect(store.matrix).toBeUndefined();
    });

    it('should set rotate position', () => {
        const newX = 2,
            newY = 3,
            store = RootStore.create({downY: 10, downX: 12});
        store.setRotateFromPosition({x: newX, y: newY});
        expect(store.downX).toEqual(newX);
        expect(store.downY).toEqual(newY);
    });

    it('should stop rotate', () => {
        const store = RootStore.create({downY: 10, downX: 12});
        store.stopRotate();
        expect(store.downX).toEqual(null);
        expect(store.downY).toEqual(null);
    });
});

describe('Twisting', () => {
    it('should start', () => {
        const cube1 = generateCube(1, 2, 3);
        const store = RootStore.create({smallCubes: [cube1], isTwisting: false});
        jest.spyOn(store, 'deselectTwistFaces');
        jest.spyOn(store, 'addTwistFace');

        store.startTwist(store.smallCubes[0].faces[0]);
        expect(store.deselectTwistFaces).toHaveBeenCalledTimes(1);
        expect(store.addTwistFace).toHaveBeenCalledTimes(1);

    });

    it('should not start when already twisting', () => {
        const cube1 = generateCube(1, 2, 3);
        const store = RootStore.create({smallCubes: [cube1], isTwisting: true});
        jest.spyOn(store, 'deselectTwistFaces');
        jest.spyOn(store, 'addTwistFace');

        store.startTwist(store.smallCubes[0].faces[0]);
        expect(store.deselectTwistFaces).toHaveBeenCalledTimes(0);
        expect(store.addTwistFace).toHaveBeenCalledTimes(0);
    });

    it('should deselect faces', () => {
        const cube1 = generateCube(1, 2, 3);
        const store = RootStore.create({smallCubes: [cube1], twistFaces: [cube1.faces[0].id]});

        store.deselectTwistFaces();
        expect(store.twistFaces.length).toEqual(0);
    })

    it('should not twist if there is less than two selected', () => {
        const store = RootStore.create({twistFaces: []});
        let result = store.twistIfSelection();
        expect(result).not.toEqual(true);
    });

    it('should twist if there are more than two selected', () => {
        const cube1 = generateCube(1, 2, 3);
        const store = RootStore.create({smallCubes: [cube1], twistFaces: [cube1.faces[0].id, cube1.faces[1].id]});
        let result = store.twistIfSelection();
        expect(result).toEqual(true);
    });

    it("should end twist", () => {
        const store = RootStore.create({isTwisting: true});
        store.endTwist();
        expect(store.isTwisting).toEqual(false);
    });

    it('should get cubes with the correct row', () => {
        const cube1 = generateCube(1,2,3),
            cube2 = generateCube(2,3,4),
            store = RootStore.create({smallCubes: [cube1, cube2]}),
            result = store.getCubes('x', 2);

        expect(result[0].xRow).toEqual(2);
    });

    it('should not add another twist face if none already selected', () => {
        const cube1 = generateCube(1,2,3),
            cube2 = generateCube(2,3,4),
            store = RootStore.create({smallCubes: [cube1, cube2], twistFaces: []});

        store.addAnotherTwistFaceIfAllowed(cube1.faces[0].id);
        expect(store.twistFaces.length).toEqual(0);
    });

    it('should not add twist face if already selected', () => {
        const cube1 = generateCube(1,2,3),
            cube2 = generateCube(2,3,4),
            store = RootStore.create({smallCubes: [cube1, cube2], twistFaces: [cube1.faces[0].id]}),
            face = store.smallCubes[0].faces[0];

        face.setSelected(true);
        store.addAnotherTwistFaceIfAllowed(face);
        expect(store.twistFaces.length).toEqual(1);
    });

    it('should not add twist face if in different row', () => {
        const cube1 = generateCube(1,2,3),
            cube2 = generateCube(2,3,4),
            store = RootStore.create({smallCubes: [cube1, cube2], twistFaces: [cube1.faces[0].id]}),
            face = store.smallCubes[1].faces[0];

        face.setSelected(true);
        store.addAnotherTwistFaceIfAllowed(face);
        expect(store.twistFaces.length).toEqual(1);
    });
});


