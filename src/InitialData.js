import {uuid} from 'uuidv4';

export const data = function() {
    const smallCubes = [];
    for (let xRow = 0; xRow < 3; xRow++) {
        for (let yRow = 0; yRow < 3; yRow++) {
            for (let zRow = 0; zRow < 3; zRow++) {
                smallCubes.push(
                    generateCube(xRow, yRow, zRow)
                )
            }
        }
    }
    return {
        smallCubes: smallCubes,
        matrix: typeof DOMMatrix !== 'undefined' ? new DOMMatrix('scale(1.123) rotateX(-30deg) rotateY(-30deg)'): null
    };
}();

export function generateCube(xRow, yRow, zRow) {
    return {
        xRow,
        yRow,
        zRow,
        faces: [
            {
                id: uuid(),
                position: 'FRONT',
                color: 'GREEN',
                showExterior: zRow === 0
            },
            {
                id: uuid(),
                position: 'BACK',
                color: 'RED',
                showExterior: zRow === 2
            },
            {
                id: uuid(),
                position: 'LEFT',
                color: 'GRAY',
                showExterior: xRow === 0
            },
            {
                id: uuid(),
                position: 'RIGHT',
                color: 'BLUE',
                showExterior: xRow === 2
            },
            {
                id: uuid(),
                position: 'TOP',
                color: 'PURPLE',
                showExterior: yRow === 0
            },
            {
                id: uuid(),
                position: 'BOTTOM',
                color: 'YELLOW',
                showExterior: yRow === 2
            }
        ]
    };
}