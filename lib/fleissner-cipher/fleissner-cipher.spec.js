const fleissnerCipher = require('./fleissner-cipher')
const { rotateRight, countFields, mapMatrix } = require('../rotation/rotation')
const { range, forEach, or } = require('ramda')
const jsc = require('jsverify')

describe('fleissner-cipher', () => {
    describe('createMatrix', () => {
        forEach((size) => {
            it(`should throw on size ${size}`, () => {
                expect(() => {
                    fleissnerCipher.createMatrix({ size })
                }).toThrow()
            })
        }, [1, 3, 5, 7, 9])

        forEach((size) => {
            it(`should not throw on size ${size}`, () => {
                expect(() => {
                    fleissnerCipher.createMatrix({ size })
                }).not.toThrow()
            })
        }, [2, 4, 6, 8, 10])

        it('should throw on negative squarelengths', () => {
            expect(() => {
                fleissnerCipher.createMatrix({ size: -2 })
            }).toThrow()
        })

        it('should throw on size 0', () => {
            expect(() => {
                fleissnerCipher.createMatrix({ size: 0 })
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
    })

    describe('encrypt', () => {
        const simplestKey = [
            [true, true, false, false],
            [true, true, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ]

        it('should return an array of arrays of same size', () => {
            const result = fleissnerCipher.encrypt(simplestKey, '1234567890ABCEF')
            expect(result instanceof Array).toBe(true)
            let subResultTested = false;
            forEach((textSquare) => {
                expect(textSquare.length).toBe(simplestKey.length)
                forEach((row) => {
                    expect(row.length).toBe(simplestKey[0].length)
                    forEach((cell) => {
                        expect(typeof cell).toEqual('string')
                        subResultTested = true
                    }, row)
                }, textSquare)
            }, result)
            expect(subResultTested).toBe(true)
        })

        it('should position each char only where the key is true', () => {
            const result = fleissnerCipher.encrypt(simplestKey, 'ABCD')[0]
            expect(result[0][0]).toBe('A')
            expect(result[0][1]).toBe('B')
            expect(result[1][0]).toBe('C')
            expect(result[1][1]).toBe('D')
        })

        it('should position chars extending key quarter size at rotated positions', () => {
            const result = fleissnerCipher.encrypt(simplestKey, 'ABCDEFGH')[0]
            expect(result[0][2]).toBe('E')
            expect(result[0][3]).toBe('F')
            expect(result[1][2]).toBe('G')
            expect(result[1][3]).toBe('H')
        })

        it('should position chars extending key quarter double size at 180 degrees', () => {
            const result = fleissnerCipher.encrypt(simplestKey, 'ABCDEFGHIJKL')[0]
            expect(result[2][2]).toBe('I')
            expect(result[2][3]).toBe('J')
            expect(result[3][2]).toBe('K')
            expect(result[3][3]).toBe('L')
        })

        it('should position chars extending key quarter tripple size at 180 degrees', () => {
            const result = fleissnerCipher.encrypt(simplestKey, 'ABCDEFGHIJKLMNOP')[0]
            expect(result[2][0]).toBe('M')
            expect(result[2][1]).toBe('N')
            expect(result[3][0]).toBe('O')
            expect(result[3][1]).toBe('P')
        })

        it('should position chars that excete complete keysize in another square', () => {
            const result = fleissnerCipher.encrypt(simplestKey, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456')[1]
            expect(result).toEqual([
                ['Q', 'R', 'U', 'V'],
                ['S', 'T', 'W', 'X'],
                ['3', '4', 'Y', 'Z'],
                ['5', '6', '1', '2']
            ])
        })

        it('should fill up incomplete square with fillupstring', () => {
            const result = fleissnerCipher.encrypt(simplestKey, '1234567890', 'FILLUP')[0]
            expect(result[3][2]).toBe('F')
            expect(result[3][3]).toBe('I')
            expect(result[2][0]).toBe('L')
            expect(result[2][1]).toBe('L')
            expect(result[3][0]).toBe('U')
            expect(result[3][1]).toBe('P')
        })

        it('should fill up incomplete square as far as possible', () => {
            const result = fleissnerCipher.encrypt(simplestKey, '1234567890AB', 'FILLUP')[0]
            expect(result[0][0]).toBe('1')
            expect(result[0][1]).toBe('2')
            expect(result[2][0]).toBe('F')
            expect(result[2][1]).toBe('I')
            expect(result[3][0]).toBe('L')
            expect(result[3][1]).toBe('L')
        })

        it('should fill up incomplete square with duplicates of fillup', () => {
            const result = fleissnerCipher.encrypt(simplestKey, '1234567890', 'ABC')[0]
            expect(result[3][2]).toBe('A')
            expect(result[3][3]).toBe('B')
            expect(result[2][0]).toBe('C')
            expect(result[2][1]).toBe('A')
            expect(result[3][0]).toBe('B')
            expect(result[3][1]).toBe('C')
        })
    })
})