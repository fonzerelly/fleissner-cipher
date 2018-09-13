const { range, compose, multiply } = require('ramda')//(size) => [...Array(size).keys()]
const rotation = require('./rotation')
const { random, floor } = Math;

const createAny = (size) => {
    console.log(size)
    return range(0, size)
            .map(() => range(0, size)
                .map(() => false)
            )
}


const randomLimitedInt = (max) => {
    return floor(multiply(max, random()))
}

const randomCoordinate = (max) => {
    return {
        x: randomLimitedInt(matrix.length),
        y: randomLimitedInt(matrix.length)
    }
}

const punctuateMatrix = ({ coordinate, matrix }) => {
    const {x, y} = coordinate
    matrix[x][y] = true
    return matrix;
}

// const

const isValid = (mergedMatrices) => {
    return mergedMatrices.reduce((init, row) => {
        return row.reduce((perRow, col) => {
            return perRow && col
        }, init)
    }, true)
}

const mergeRotations = (matrix) => {
    const by90 = rotation.rotateRight(matrix);
    const by180 = rotation.rotateRight(by90);
    const by270 = rotation.rotateRight(by180)
    const first = rotation.mergeBooleanMatrices(matrix, by90)
    const second = rotation.mergeBooleanMatrices(by180, by270)   
    const all = rotation.mergeBooleanMatrices(first,second);
    return all;
}
module.exports = {
    create: (size, seed=null) => {
        const initialMatrix = createAny(size)
        const pointCount = Math.floor(size*size/4);

        if (pointCount > 0) {
            punctuateMatrix({coordinate: {x: 0, y: 0}, matrix: initialMatrix})
        }
        // let valid = false
        // while (!valid) {
        //     const matrix = createAny(size)
        //     console.log(matrix)
        //     const forCheck = mergeRotations(matrix)
        //     console.log(matrix, forCheck)
        //     valid = isValid(forCheck)
        //     if (valid) {
        //         return matrix;
        //     }       
        // }
        return initialMatrix
    }
}