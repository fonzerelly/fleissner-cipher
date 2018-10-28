const R = require('ramda')

module.exports = {

    rotateRight: (input) => {
        // reverse the rows
        let matrix = R.clone(input).reverse();
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

    mapMatrix: (fn, first, second) => {
        return first.map((row, rowIdx) => {
            return row.map((col, colIdx) => {
                return fn (col, second[rowIdx][colIdx])
            })  
        })
    },

    matrix2Str: (matrix) => {
        return matrix.map((row) => {
            return row.map((x) => (x)?"1": "0").join('  ')
        }).join('\n')
    },

    countFields: (matrix) => {
        let count = 0
        matrix.forEach((row) => {
            row.forEach((field) => {
                if (field) {
                    count += 1;
                }
            })
        })
        return count;
    }
}