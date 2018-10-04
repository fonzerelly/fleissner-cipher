const { or } = require('ramda')
const rotation = require('./rotation');
const grille = require('./grille');
describe('grille', () => {
    [
         1,
        // 2,
        // 3,
        // 4,
        // 5
    ].forEach((size) => {
        it(`create an array of size ${size}`, () => {
            const matrix = grille.create(size)
            expect(matrix.length).toBe(size)
            
        })
        it(`should create squares of size ${size}`, () => {
            const matrix = grille.create(size)
            expect(rotation.isSquare(matrix)).toBe(true);
        })
        it(`should contain ${size*size} booleans`, () => {
            let tested = false;
            const matrix = grille.create(size)
            const left = matrix.forEach((row) => {
                row.forEach((value) => {
                    tested = true
                    expect(typeof value).toBe('boolean')
                })
            })
            expect(tested).toBe(true)
        })
        it(`should be completely asymetry to the center ${size}`, () => {
            let tested = false;
            const matrix = grille.create(size);
            const by90 = rotation.rotateRight(matrix);
            const by180 = rotation.rotateRight(by90);
            const by270 = rotation.rotateRight(by180)
            const first = rotation.mergeBooleanMatrices(matrix, by90)
            const second = rotation.mergeBooleanMatrices(by180, by270)
            const all = rotation.mergeBooleanMatrices(first,second);
            all.forEach((row) => {
                row.forEach((col) => {
                    tested = true;
                    expect(col).toBe(true)
                })
            })
            expect(tested).toBe(true);
        })

    })
    fdescribe('blah', () => {
        it('for a key of size 2 one field valid', () => {
            const matrix = grille.create(2)
            expect(rotation.squeezeBoolMatrix(matrix)).toBe(true)
        })

        it('should punctuate randomly', () => {
            const matrixBen = grille.create(2, 'sam');
            const matrixSam = grille.create(2, 'ben')
            expect(matrixBen).not.toEqual(matrixSam);
        })

        it('must not allow keys of odd sized fields', () => {
            expect(() => { grille.create(3) }).toThrow()
        })

        

        it('for a key of size 4 two fields should be valid', () => {
            const seedThatMatchesTheSameFieldMoreThanOneTime = 1537910457525
            const matrix = grille.create(4, seedThatMatchesTheSameFieldMoreThanOneTime)

            expect(rotation.countFields(matrix)).toBe(4)
        })

        it('should not match any fields with it self rotatet by 90 degrees', () => {
            // 1537984422281
            const seedThatWouldForceCoordinateRefinement = 1537910457525
            const matrix = grille.create(4, seedThatWouldForceCoordinateRefinement)
            console.log('###',rotation.matrix2Str(matrix))
            const by90 = rotation.rotateRight(matrix)
            console.log('...', rotation.matrix2Str(by90))
            const merged = rotation.mapMatrix(or, matrix, by90)

            expect(rotation.countFields(merged)).toBe(8)
        })

        xit('should not match any fields with it self rotatet by 90 degrees', () => {
            // 1537984422281
            const seedThatWouldForceCoordinateRefinement = 1537910457525
            const matrix = grille.create(4, seedThatWouldForceCoordinateRefinement)
            console.log('###',rotation.matrix2Str(matrix))
            const by180 = rotation.rotateRight(rotation.rotateRight(matrix))
            console.log('...', rotation.matrix2Str(by180))
            const merged = rotation.mapMatrix(or, matrix, by180)

            expect(rotation.countFields(merged)).toBe(8)
        })

        xit(`should be completely asymetry to the center 3`, () => {
            let tested = false;
            const matrix = grille.create(3);
            const by90 = rotation.rotateRight(matrix);
            const by180 = rotation.rotateRight(by90);
            const by270 = rotation.rotateRight(by180)
            const first = rotation.mergeBooleanMatrices(matrix, by90)
            const second = rotation.mergeBooleanMatrices(by180, by270)
            const all = rotation.mergeBooleanMatrices(first,second);
            all.forEach((row) => {
                row.forEach((col) => {
                    tested = true;
                    expect(col).toBe(true)
                })
            })
            expect(tested).toBe(true);
        })
    })
})