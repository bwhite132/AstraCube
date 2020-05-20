import {types} from 'mobx-state-tree';

export const MatrixType = types.custom({
    name: 'Matrix',
    fromSnapshot(str) {
        if(typeof DOMMatrix !== 'undefined') {
            return new DOMMatrix(str);
        }
    },
    toSnapshot(matrix) {
        if(matrix) {
            return matrix.toString();
        }
    },
    isTargetType(o) {
        if(typeof DOMMatrix !== 'undefined') {
            return o instanceof DOMMatrix;
        }
    },
    getValidationMessage(){}
});