const {
    or,
    range,
    forEach,
    map,
    slice
} = require('ramda')
const {
    mapMatrix,
    rotateRight
} = require('../rotation/rotation')
const {
    random,
    seed
} = require('../random/random')

const createEmptyMatrix = (size) => {
    return range(0, size)
        .map(() => range(0, size)
            .map(() => false)
        )
}


const punctuateMatrix = ({
    coordinate,
    matrix
}) => {
    const {
        x,
        y
    } = coordinate
    matrix[x][y] = true
    return matrix;
}

const rotateIntoRandomQuadrant = ({
    matrix
}) => {
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
    createMatrix: ({
        size,
        salt
    }) => {
        preconditionCorrectSize(size);

        seed(salt)

        let punctuatedMatrix = createEmptyMatrix(size)
        forFirstQuadrant((col, row) => {
            const rotatedMatrix = rotateIntoRandomQuadrant({
                matrix: createMatrixWithOnePoint(col, row, size)
            });
            punctuatedMatrix = merge(rotatedMatrix, punctuatedMatrix)
        }, size);

        return punctuatedMatrix
    },
    encrypt: (key, text, fillup = ABC) => {
        let result = [];
        const keySize = Math.pow(key.length, 2)
        while (text.length > 0) {
            let message = headChars(keySize, text).reverse()
            text = tailChars(keySize, text)
            if (message.length < keySize) {
                const filler = createFillText(fillup, keySize, message.length);
                message = filler
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

function createFillText(fillup, keySize, messageLength) {
    const fillupText = fillup.repeat(Math.ceil(keySize / fillup.length));
    const fillupSize = keySize - messageLength;
    const filler = headChars(fillupSize, fillupText)
        .reverse();
    return filler;
}

function tailChars(keySize, text) {
    return slice(keySize, Infinity, text);
}

function headChars(keySize, text) {
    return slice(0, keySize, text).split('');
}

function forFirstQuadrant(handleCoordinate, size) {
    const halfSideLength = size / 2
    forEach((row) => {
        forEach((col) => {
            handleCoordinate(col, row);
        }, range(0, halfSideLength));
    }, range(0, halfSideLength));
}

function merge(onePointMatrix, punctuatedMatrix) {
    return mapMatrix(or, onePointMatrix, punctuatedMatrix);
}

function createMatrixWithOnePoint(col, row, size) {
    return punctuateMatrix({
        coordinate: {
            x: col,
            y: row
        },
        matrix: createEmptyMatrix(size)
    });
}

function preconditionCorrectSize(size) {
    if (isOdd(size)) {
        throw new Error('Only even sized square sides are allowed!');
    }
    if (size <= 0) {
        throw new Error('Only positive and bigger than 0 sized squre sides are allowed!');
    }
}

function isOdd(size) {
    return size % 2 !== 0;
}