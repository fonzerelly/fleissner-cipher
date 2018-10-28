const fleissnerCipher = require('./fleissner-cipher')
const { rotateRight, countFields, mapMatrix, matrix2Str } = require('./rotation')
const { range, forEach, or } = require('ramda')
const jsc = require('jsverify')

fdescribe('fleissner-cipher', () => {
    it('should throw on an odd sized squarelength', () => {
        expect(() => {
            fleissnerCipher.createMatrix({ size: 1 })
        }).toThrow()
    })

    it('must not throw on even squaresides', () => {
        expect(() => {
            fleissnerCipher.createMatrix({ size: 2 })
        }).not.toThrow()
    })

    it('should throw on negativ squarelenths', () => {
        expect(() => {
            fleissnerCipher.createMatrix({ size: -2 })
        }).toThrow()
    })

    describe('resulting matrix of size 6', () => {
        let matrix
        beforeEach(() => {
            matrix = fleissnerCipher.createMatrix({ size: 6 })
        })

        it('should return matrix of 6 rows', () => {
            expect(matrix.length).toBe(6)
        })

        it('should provide rows of size 6', () => {
            forEach((row) => {
                expect(row.length).toBe(6)
            }, matrix)
        })

        it('should contain only booleans', () => {
            forEach((row) => {
                forEach((col) => {
                    expect(typeof col).toBe('boolean')
                }, row)
            }, matrix)
        })

        it('should return a boolean array, which rotations are not overlapping', () => {
            const by90 = rotateRight(matrix)
            const by180 = rotateRight(by90)
            const by270 = rotateRight(by180)
            const half = mapMatrix(or, matrix, by90)
            const threeQuaters = mapMatrix(or, half, by180)
            const complete = mapMatrix(or, threeQuaters, by270)
            let completedTest = false
            forEach((row) => {
                forEach((col) => {
                    expect(col).toBe(true)
                    completedTest = true
                }, row)
            }, complete)
            expect(completedTest).toBeTruthy()
        })

        it('should provide exactly a quarter of squared size holes', () => {
            const expectedHoles = Math.pow(matrix.length, 2) / 4
            let actualHoles = countFields(matrix)

            expect(actualHoles).toBe(expectedHoles)
        })

        it('must not keep all holes in first quadrand', () => {
            const maxHoles = Math.pow(matrix.length, 2) / 4
            const halfSideLength = matrix.length / 2
            let actualHolesInFirstQuadrant = 0
            forEach((y) => {
                forEach((x) => {
                    const cell = matrix[y][x]
                    if (cell) {
                        actualHolesInFirstQuadrant += 1
                    }
                }, range(0, halfSideLength))
            }, range(0, halfSideLength))
            expect(actualHolesInFirstQuadrant).toBeLessThan(maxHoles)
        })

        it('must not keep all holes in second quadrand', () => {
            const maxHoles = Math.pow(matrix.length, 2) / 4
            const halfSideLength = matrix.length / 2
            let actualHolesInFirstQuadrant = 0
            forEach((y) => {
                forEach((x) => {
                    const cell = matrix[y][x]
                    if (cell) {
                        actualHolesInFirstQuadrant += 1
                    }
                }, range(halfSideLength, matrix.length))
            }, range(0, halfSideLength))
            expect(actualHolesInFirstQuadrant).toBeLessThan(maxHoles)
        })

        it('must not keep all holes in third quadrand', () => {
            const maxHoles = Math.pow(matrix.length, 2) / 4
            const halfSideLength = matrix.length / 2
            let actualHolesInFirstQuadrant = 0
            forEach((y) => {
                forEach((x) => {
                    const cell = matrix[y][x]
                    if (cell) {
                        actualHolesInFirstQuadrant += 1
                    }
                }, range(0, halfSideLength))
            }, range(halfSideLength, matrix.length))
            expect(actualHolesInFirstQuadrant).toBeLessThan(maxHoles)
        })

        it('must not keep all holes in fourth quadrand', () => {
            const maxHoles = Math.pow(matrix.length, 2) / 4
            const halfSideLength = matrix.length / 2
            let actualHolesInFirstQuadrant = 0
            forEach((y) => {
                forEach((x) => {
                    const cell = matrix[y][x]
                    if (cell) {
                        actualHolesInFirstQuadrant += 1
                    }
                }, range(halfSideLength, matrix.length))
            }, range(halfSideLength, matrix.length))
            expect(actualHolesInFirstQuadrant).toBeLessThan(maxHoles)
        })
    })

    it('should be reproducable', () => {
        const samsFirstKey = fleissnerCipher.createMatrix({ size: 6, salt: 'sam' })
        const samsSecondKey = fleissnerCipher.createMatrix({ size: 6, salt: 'sam' })
        expect(samsFirstKey).toEqual(samsSecondKey);
    })

    it('should create differend results for differend salts', () => {
        const samsKey = fleissnerCipher.createMatrix({ size: 6, salt: 'sam' })
        const bensKey = fleissnerCipher.createMatrix({ size: 6, salt: 'ben' })
        expect(samsKey).not.toEqual(bensKey)
    })

    xdescribe('invariant', () => {
        it('all rotations must not overlap', () => {
            const result = jsc.checkForall(
                jsc.suchthat(jsc.nat(), (value) => {
                    return value % 2 == 0
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
})