import {types} from 'mobx-state-tree';
import {TwistFaces} from '../TwistData';

export const Face = types.model({
    id: types.identifier,
    position: types.enumeration('Position', ['FRONT', 'BACK', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM']),
    color: types.enumeration('Color', ['GREEN', 'RED', 'GRAY', 'BLUE', 'PURPLE', 'YELLOW']),
    isSelected: types.optional(types.boolean, false),
    showExterior: types.boolean
}).actions(self => ({
    setSelected(v) {
        self.isSelected = v;
    },
    twist(dimension, direction) {
        const currentIndex = TwistFaces[dimension].indexOf(self.position),
            length = 4,
            nextIndex = (currentIndex + direction) < 0 ? length - 1 : (currentIndex + direction) % 4;

        self.position = TwistFaces[dimension][nextIndex];
    }
})).views(self => ({
    shouldTwist(dimension) {
        return TwistFaces[dimension].indexOf(self.position) !== -1;
    }
}));