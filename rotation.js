const R = require('ramda')

const mergeArray = (first, second) => {
    // return first.map((value, index) => {
    //     return value && 
    // })
}

module.exports = {

    rotateRight: (input) => {
        // reverse the rows
        matrix = input.reverse();

        // swap the symmetric elements
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < i; j++) {
                var temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        return matrix;
    },

    isSquare: (matrix) => {
        const lengths = matrix.map( (m) => m.length)
        return lengths.reduce((init, l) => {
            return init && l === matrix.length;
        }, true)
    },

    mergeBooleanMatrices: (first, second) => {
        return first.map((row, rowIdx) => {
            return row.map((col, colIndex) => {
                return col && second[rowIdx][colIndex]
            })  
        })
    },

    squeezeBoolMatrix: (matrix) => {
        return R.any(R.identity, matrix.map((row) => {
            return R.any(R.identity, row)
        }));
    }
}