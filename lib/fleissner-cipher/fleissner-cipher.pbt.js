const fleissnerCipher = require('./fleissner-cipher')
const { rotateRight, mapMatrix, countFields } = require('../rotation/rotation')

const { or } = require('ramda')
const jsc = require('jsverify')

describe('fleissner-cipher', () => {
    it('all rotations must not overlap', () => {
        const result = jsc.checkForall(
            jsc.suchthat(jsc.nat(), (value) => {
                return value > 0  && value % 2 == 0
            }),
            jsc.string,
            (size, salt) => {
                const matrix = fleissnerCipher.createMatrix({ size, salt })
                const by90 = rotateRight(matrix)
                const by180 = rotateRight(by90)
                const by270 = rotateRight(by180)
                const half = mapMatrix(or, matrix, by90)
                const threeQuaters = mapMatrix(or, half, by180)
                const complete = mapMatrix(or, threeQuaters, by270)
                return countFields(complete) === Math.pow(size, 2)
            }
        )
        expect(result).toBe(true)
    })
})