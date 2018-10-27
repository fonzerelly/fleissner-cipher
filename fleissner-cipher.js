const { or, range, forEach } = require('ramda')
const { mapMatrix, rotateRight } = require('./rotation')
const { random } = require('./random')

const createAny = ({ size }) => {
    return range(0, size)
        .map(() => range(0, size)
            .map(() => false)
        )
}


const punctuateMatrix = ({ coordinate, matrix }) => {
    const {x, y} = coordinate
    matrix[x][y] = true
    return matrix;
}

const randomRotation = ({ matrix }) => {
    const times = Math.ceil(random() * 4)
    let result = matrix
    forEach((_) => {
        result = rotateRight(result)
    }, range(0, times))
    return result
}

module.exports = {
    createMatrix: ({ size }) => {
        if (size % 2 !== 0) {
            throw new Error('Only even sized square sides allowed')
        }
        const falsyMatrix = createAny({ size })
        const halfSideLength = size / 2
        let punctuatedMatrix = falsyMatrix
        forEach((row) => {
            forEach((col) => {
                const onePointMatrix = randomRotation({
                    matrix: punctuateMatrix({
                        coordinate: {x: col, y: row},
                        matrix: createAny({ size })
                    })
                })
                punctuatedMatrix = mapMatrix(or, onePointMatrix, punctuatedMatrix)
            }, range(0, halfSideLength))
        }, range(0, halfSideLength))
        const result = punctuatedMatrix
        return result
    }
}