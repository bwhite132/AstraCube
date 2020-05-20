import { SmallCube } from './SmallCube';

const initialValues = {
    xRow: 0,
    yRow: 1,
    zRow: 2
};


describe('smallcube', () => {
    it('should create an instance', () => {
        const smallCube = SmallCube.create(initialValues);
        expect(smallCube.xRow).toBe(0);
        expect(smallCube.yRow).toBe(1);
        expect(smallCube.zRow).toBe(2);
    });

    it('should twist', () => {
        const smallCube = SmallCube.create(initialValues);
        smallCube.twist('x', 1);
        expect(smallCube.twistDirection).toEqual(1);
        expect(smallCube.twistDimension).toEqual('x');
        expect(smallCube.isLightOn).toEqual(true);
    });

    it('should hide light', () => {
        const smallCube = SmallCube.create({...initialValues, isLightOn: true});
        smallCube.hideLight();
        expect(smallCube.isLightOn).toEqual(false);
    });

    it('should call x update position method when twisting on x', () => {
        const smallCube = SmallCube.create({...initialValues, twistDimension: 'x'});
        smallCube.updatePositionAfterTwistX = jest.fn();
        smallCube.updatePosition();
        expect(smallCube.updatePositionAfterTwistX).toHaveBeenCalledTimes(1);
    });

    it('should call y update position method when twisting on y', () => {
        const smallCube = SmallCube.create({...initialValues, twistDimension: 'y'});
        smallCube.updatePositionAfterTwistY = jest.fn();
        smallCube.updatePosition();
        expect(smallCube.updatePositionAfterTwistY).toHaveBeenCalledTimes(1);
    });

    it('should call z update position method when twisting on z', () => {
        const smallCube = SmallCube.create({...initialValues, twistDimension: 'z'});
        smallCube.updatePositionAfterTwistZ = jest.fn();
        smallCube.updatePosition();
        expect(smallCube.updatePositionAfterTwistZ).toHaveBeenCalledTimes(1);
    });

    it('should call update 3 times when rotating backwards', () => {
        const smallCube = SmallCube.create({...initialValues, twistDimension: 'z', twistDirection: -1});
        smallCube.updatePositionAfterTwistZ = jest.fn();
        smallCube.updatePosition();
        expect(smallCube.updatePositionAfterTwistZ).toHaveBeenCalledTimes(3);
    });

    it('should update x position', () => {
        const smallCube = SmallCube.create(initialValues);
        smallCube.updatePositionAfterTwistX();
        expect(smallCube.xRow).toEqual(0);
        expect(smallCube.zRow).toEqual(1);
        expect(smallCube.yRow).toEqual(2);
    });

    it('should update y position', () => {
        const smallCube = SmallCube.create(initialValues);
        smallCube.updatePositionAfterTwistY();
        expect(smallCube.xRow).toEqual(0);
        expect(smallCube.zRow).toEqual(0);
        expect(smallCube.yRow).toEqual(1);
    });

    it('should update z position', () => {
        const smallCube = SmallCube.create(initialValues);
        smallCube.updatePositionAfterTwistZ();
        expect(smallCube.xRow).toEqual(1);
        expect(smallCube.zRow).toEqual(2);
        expect(smallCube.yRow).toEqual(0);
    });

    it('should complete twist', () => {
        const smallCube = SmallCube.create({...initialValues, twistDimension: 'x'});
        smallCube.updatePosition = jest.fn();
        smallCube.updateFaces = jest.fn();
        smallCube.completeTwist();
        expect(smallCube.updatePosition).toHaveBeenCalledTimes(1);
        expect(smallCube.updateFaces).toHaveBeenCalledTimes(1);
        expect(smallCube.twistDimension).toEqual(null);
    });

    it('should return true if twisting forward', () => {
        const smallCube = SmallCube.create({...initialValues, twistDirection: 1});
        const result = smallCube.isTwistingForward();

        expect(result).toEqual(true);
    });

    it('should return false if twisting backwards', () => {
        const smallCube = SmallCube.create({...initialValues, twistDirection: -1});
        const result = smallCube.isTwistingForward();

        expect(result).toEqual(false);
    });

    it('should rotate 90 deg if twisting forward on a dimension', () => {
        const smallCube = SmallCube.create({...initialValues, twistDirection: 1, twistDimension: 'x'});
        const result = smallCube.getRotate('x');
        expect(result).toEqual(90);
    });

    it('should not rotate if not twisting on a dimension', () => {
        const smallCube = SmallCube.create({...initialValues, twistDirection: 1, twistDimension: null});
        const result = smallCube.getRotate('x');
        expect(result).toEqual(0);
    });

    it('should rotate -90 deg if twisting backward on a dimension', () => {
        const smallCube = SmallCube.create({...initialValues, twistDirection: -1, twistDimension: 'x'});
        const result = smallCube.getRotate('x');
        expect(result).toEqual(-90);
    });
});