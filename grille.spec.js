const rotation = require('./rotation');
const grille = require('./grille');
xdescribe('grille', () => {
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
        it('for a key of size 1 is invalid, no field es empty', () => {
            const matrix = grille.create(1)
            expect(matrix).toEqual([[false]])
        })

        it('for a key of size 2 one field valid', () => {
            const matrix = grille.create(2)
            expect(rotation.squeezeBoolMatrix(matrix)).toBe(true)
        })

        it('should punctuate randomly', () => {
            
        })
    })
})