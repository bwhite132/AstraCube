import {Face} from './Face';

const initialValues = {
    id: 'arbitrary id',
    position: 'FRONT',
    color: 'GREEN',
    isSelected: false,
    showExterior: true
};


describe('face', () => {
    it('should set selected', () => {
        const face = Face.create(initialValues);
        face.setSelected(true);
        expect(face.isSelected).toEqual(true);
    });

    it('should twist x forward', () => {
        const face = Face.create(initialValues);
        face.twist('x', 1);
        expect(face.position).toEqual('TOP');
        face.twist('x', 1);
        expect(face.position).toEqual('BACK');
        face.twist('x', 1);
        expect(face.position).toEqual('BOTTOM');
        face.twist('x', 1);
        expect(face.position).toEqual('FRONT');
    });

    it('should twist x backward', () => {
        const face = Face.create(initialValues);
        face.twist('x', -1);
        expect(face.position).toEqual('BOTTOM');
        face.twist('x', -1);
        expect(face.position).toEqual('BACK');
        face.twist('x', -1);
        expect(face.position).toEqual('TOP');
        face.twist('x', -1);
        expect(face.position).toEqual('FRONT');
    });

    it('should twist y forward', () => {
        const face = Face.create(initialValues);
        face.twist('y', 1);
        expect(face.position).toEqual('RIGHT');
        face.twist('y', 1);
        expect(face.position).toEqual('BACK');
        face.twist('y', 1);
        expect(face.position).toEqual('LEFT');
        face.twist('y', 1);
        expect(face.position).toEqual('FRONT');
    });

    it('should twist y backward', () => {
        const face = Face.create(initialValues);
        face.twist('y', -1);
        expect(face.position).toEqual('LEFT');
        face.twist('y', -1);
        expect(face.position).toEqual('BACK');
        face.twist('y', -1);
        expect(face.position).toEqual('RIGHT');
        face.twist('y', -1);
        expect(face.position).toEqual('FRONT');
    });

    it('should twist z forward', () => {
        const face = Face.create({...initialValues, position: 'RIGHT'});
        face.twist('z', 1);
        expect(face.position).toEqual('BOTTOM');
        face.twist('z', 1);
        expect(face.position).toEqual('LEFT');
        face.twist('z', 1);
        expect(face.position).toEqual('TOP');
        face.twist('z', 1);
        expect(face.position).toEqual('RIGHT');
    });

    it('should twist z backward', () => {
        const face = Face.create({...initialValues, position: 'RIGHT'});
        face.twist('z', -1);
        expect(face.position).toEqual('TOP');
        face.twist('z', -1);
        expect(face.position).toEqual('LEFT');
        face.twist('z', -1);
        expect(face.position).toEqual('BOTTOM');
        face.twist('z', -1);
        expect(face.position).toEqual('RIGHT');
    });

    it('should not twist when position on wrong dimension', () => {
        const faceRight = Face.create({...initialValues, position: 'RIGHT'}),
            faceBack = Face.create({...initialValues, position: 'BACK'}),
            faceLeft = Face.create({...initialValues, position: 'LEFT'}),
            faceFront = Face.create({...initialValues, position: 'FRONT'}),
            faceTop = Face.create({...initialValues, position: 'TOP'}),
            faceBottom = Face.create({...initialValues, position: 'BOTTOM'});


        expect(faceRight.shouldTwist('x')).toEqual(false);
        expect(faceLeft.shouldTwist('x')).toEqual(false);
        expect(faceTop.shouldTwist('y')).toEqual(false);
        expect(faceBottom.shouldTwist('y')).toEqual(false);
        expect(faceFront.shouldTwist('z')).toEqual(false);
        expect(faceBack.shouldTwist('z')).toEqual(false);
    });

    it('should twist when position on correct dimension', () => {
        const faceRight = Face.create({...initialValues, position: 'RIGHT'}),
            faceBack = Face.create({...initialValues, position: 'BACK'}),
            faceLeft = Face.create({...initialValues, position: 'LEFT'}),
            faceFront = Face.create({...initialValues, position: 'FRONT'}),
            faceTop = Face.create({...initialValues, position: 'TOP'}),
            faceBottom = Face.create({...initialValues, position: 'BOTTOM'});


        expect(faceRight.shouldTwist('y')).toEqual(true);
        expect(faceRight.shouldTwist('z')).toEqual(true);
        expect(faceLeft.shouldTwist('y')).toEqual(true);
        expect(faceLeft.shouldTwist('z')).toEqual(true);
        expect(faceTop.shouldTwist('x')).toEqual(true);
        expect(faceTop.shouldTwist('z')).toEqual(true);
        expect(faceBottom.shouldTwist('x')).toEqual(true);
        expect(faceBottom.shouldTwist('z')).toEqual(true);
        expect(faceFront.shouldTwist('x')).toEqual(true);
        expect(faceFront.shouldTwist('y')).toEqual(true);
        expect(faceBack.shouldTwist('x')).toEqual(true);
        expect(faceBack.shouldTwist('y')).toEqual(true);
    });
});