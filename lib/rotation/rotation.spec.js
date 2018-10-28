const rotation = require('./rotation')

describe('rotation', () => {
    describe('isSquare', () => {
        [
            { input: [], output: true },
            { input: [[1]], output: true },
            { input: [1,1], output: false },
            { input: [[1,1],[2,2]], output: true},
            { input: [[1,1], [2,2], [3,3]], output: false}
        ].forEach(({input, output}) => {
            it(`should ${(output? '': 'not ')}recognize as square: ${JSON.stringify(input)}`, () => {
                expect(rotation.isSquare(input)).toBe(output)
            })
        })
    })

    describe('mergeBooleanMatrices', () => {
        [
            {first: [], second: [], result: []},
            {first: [[true]], second: [[true]], result: [[true]]},
            {first: [[true]], second: [[false]], result: [[false]]},
            {
                first: [
                    [true, false],
                    [false, true]
                ],
                second: [
                    [false, true],
                    [true, false]
                ],
                result: [
                    [false, false],
                    [false, false]
                ]
            },
            {
                first: [
                    [true, false],
                    [true, false]
                ],
                second: [
                    [true, false],
                    [true, false]
                ],
                result: [
                    [true, false],
                    [true, false]
                ]
            }
        ].forEach(({ first, second, result }) => {
            it(`should merge ${JSON.stringify(first)} and ${JSON.stringify(second)} to ${JSON.stringify(result)}`, () => {
                expect(rotation.mergeBooleanMatrices(first, second)).toEqual(result)
            })
        }) 

    })

    describe('mapMatrix', () => {
        const first = [
            [ {}, {} ],
            [ {}, {} ]
        ]
        const second = [
            [ {}, {} ],
            [ {}, {} ]
        ]
        let spy
        beforeEach(() => {
            spy = jasmine.createSpy()
            rotation.mapMatrix(spy, first, second)
        });

        [
            { x:0, y:0 },
            { x:1, y:0 },
            { x:0, y:1 },
            { x:1, y:1 },
        ].forEach(({x, y}) => {
            it(`should apply method to values of matrices at ${x}/${y}`, () => {
                expect(spy).toHaveBeenCalledWith(first[x][y], second[x][y])
            })
        })
    })

    
    describe('rotateRight', () => {
        [
            { input: [], output: [] },
            { 
                input: [
                    [11,12],
                    [21,22]
                ], output:[
                    [21, 11],
                    [22, 12]
                ]
            },
            { 
                input: [
                    [11,12,13],
                    [21,22,23],
                    [31,32,33]
                ], output:[
                    [31, 21, 11],
                    [32, 22, 12],
                    [33, 23, 13]
                ]
            }
        ].forEach(({ input, output }) => {
            it(`should ${JSON.stringify(input)} to ${JSON.stringify(output)}`, () => {
                expect(rotation.rotateRight(input)).toEqual(output)
            })
        })
    })
})
