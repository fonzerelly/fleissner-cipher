const { range, compose, multiply, and, or } = require('ramda')//(size) => [...Array(size).keys()]
const rotation = require('./rotation')
const { random, seed } = require('./random')
const { floor } = Math;
const R = require('ramda')

const createAny = (size) => {
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

const punctuateTimes = (matrix, times, size) => {
    const x = floor(random() * size)
    const y = floor(random() * size)

    return punctuateMatrix({coordinate: {x: floor(x1), y: floor(y1)}, matrix: initialMatrix})

}

const randomCoordinateBySize = (size) => {
    return {
        x: floor(random() * size),
        y: floor(random() * size)
    }
}

const pointCount = (matrix) => {
    return matrix.length * matrix.length / 4
}

const uniqueCoordinate = (matrix) => {
    let randomCoordinate
    while(!randomCoordinate){
        const {x, y} = randomCoordinateBySize(matrix.length)
        if (matrix[x][y] !== true){
            randomCoordinate = {x, y}
        }
    }
    return randomCoordinate
}



const rotationSymetricCoordinate = (matrix) => {
    let rotationSymetricCoordinate
    while(!rotationSymetricCoordinate) {
        const {x, y} = uniqueCoordinate(matrix)
        const by90 = rotation.rotateRight(matrix)
        if (by90[x][y] !== true) {
            console.log('§§§', x, y, '\n', rotation.matrix2Str(matrix), '\n\n', rotation.matrix2Str(by90))
            rotationSymetricCoordinate = {x, y}
        } else {
            console.log('invalid coordinate', x, y)
        }
    }
    return rotationSymetricCoordinate

    // return uniqueCoordinate(matrix)
}

const punctuateMatrixTimes = ({ matrix, times }) => {
    if (times > 0) {
        console.log('???', times)
        const newMatrix = punctuateMatrix({
            coordinate: uniqueCoordinate(matrix), 
            matrix
        })
        return punctuateMatrixTimes({
            matrix : newMatrix,
            times: times - 1
        })
    }
    return matrix
}

const refineCoordinate = ({coordinate, matrix}) => {
    const newMatrix = R.clone(matrix)
    const {x, y} = coordinate
    newMatrix[x][y] = false
    const potentialRefinables = [
        {x: x + 1, y},
        {x: x - 1, y},
        {x, y: y + 1},
        {x, y: y - 1},
        {x: x + 1, y: y + 1},
        {x: x + 1, y: y - 1},
        {x: x - 1, y: y + 1},
        {x: x - 1, y: y - 1}
    ]
    for (let i = 0; i < potentialRefinables.length; i++) {
        const {x, y} = potentialRefinables[i];
        if (!matrix[x][y]) {
            newMatrix[x][y] = true
            return newMatrix
        }
    }
    return matrix
}

module.exports = {
    create: (size, s=null) => {
        if (size % 2 !== 0) {
            throw new Error(`Odd sized keys like the size of ${size} are invalid, since they would lead to leaking secret squares.`)
        }
        seed(s)
        const initialMatrix = createAny(size)
        let pointCount = floor(size*size/4);
        let resultMatrix = initialMatrix;
        //while (pointCount > 0) {
            let newMatrix = punctuateMatrixTimes({matrix: resultMatrix, times: pointCount})
            console.log(rotation.getTruthyCoordinatesFromMatrix(newMatrix))
            // todo: test ob rotationssymetrisch...

            const overlaps = rotation.mapMatrix(and, newMatrix, rotation.rotateRight(newMatrix))
            console.log('!!!!!!', rotation.squeezeBoolMatrix(overlaps))
            //there are overlaps
            if (rotation.squeezeBoolMatrix(overlaps) === true) {
                const overlappingCoordinates = rotation.getTruthyCoordinatesFromMatrix(overlaps)
                newMatrix = overlappingCoordinates.reduce((matrix, coordinate) => {
                    return refineCoordinate({matrix, coordinate})
                }, newMatrix)
            }
            // aus gemergtem array überlappende Cooridnaten beziehen
            // refine-Methode definieren -> überlappende Coordinaten schieben.
            // const by90 = rotation.rotateRight(newMatrix);
            // const merged = rotate.mergeBooleanMatrices(newMatrix, by90)

            resultMatrix = newMatrix
            // pointCount -= 1
        //}
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
        return resultMatrix
    }
}