const { or, range, forEach, map, slice } = require('ramda')
const { mapMatrix, rotateRight } = require('../rotation/rotation')
const { random, seed } = require('../random/random')

const createAny = ({ size }) => {
    return range(0, size)
        .map(() => range(0, size)
            .map(() => false)
        )
}


const punctuateMatrix = ({ coordinate, matrix }) => {
    const { x, y } = coordinate
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

const shapeMsgToKey = (key, message, fn = (message) => (cell) => (message.length > 0 && cell) ? message.pop() : '') => {
    return map((row) => {
        return map(fn(message), row)
    }, key)
}

const createEmptySquare = (key) => {
    return shapeMsgToKey(key, '', (message) => () => '')
}

const completeSquare = (key, message, square) => {
    if (message.length <= 0) {
        return square
    }
    return completeSquare(rotateRight(key), message, mapMatrix(
        (first, second) => {
            return first + second
        },
        square,
        shapeMsgToKey(key, message)
    ))
}

const ABC = range(0, 26).map((char) => String.fromCharCode(65 + char)).join('')

module.exports = {
    createMatrix: ({ size, salt }) => {
        if (size % 2 !== 0) {
            throw new Error('Only even sized square sides are allowed!')
        }
        if (size < 0) {
            throw new Error('Only positive sized squre sides are allowed!')
        }

        seed(salt)

        const falsyMatrix = createAny({ size })
        const halfSideLength = size / 2
        let punctuatedMatrix = falsyMatrix
        forEach((row) => {
            forEach((col) => {
                const onePointMatrix = randomRotation({
                    matrix: punctuateMatrix({
                        coordinate: { x: col, y: row },
                        matrix: createAny({ size })
                    })
                })
                punctuatedMatrix = mapMatrix(or, onePointMatrix, punctuatedMatrix)
            }, range(0, halfSideLength))
        }, range(0, halfSideLength))
        const result = punctuatedMatrix
        return result
    },
    encrypt: (key, text, fillup = ABC) => {
        let result = [];
        const keySize = Math.pow(key.length, 2)
        while (text.length > 0) {
            let message = slice(0, keySize, text).split('').reverse()
            text = slice(keySize, Infinity, text)
            if (message.length < keySize) {
                message = slice(
                    0,
                    keySize - message.length,
                    fillup.repeat(Math.ceil(keySize / fillup.length))
                )
                    .split('')
                    .reverse()
                    .concat(message)
            }
            result.push(
                completeSquare(
                    key,
                    message,
                    createEmptySquare(key)
                )
            )
        }
        return result;
    }
}