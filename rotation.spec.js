const rotation = require('./rotation')

const jsc = require('jsverify');
describe('rotation', () => {
    // describe('castTo2DMatrix', () => {
    //     it('should fail on non matrix type', () => {
    //         expect(rotation.validate2DMatrix([])).toBe(false)
    //     })
    // })
    describe('squeezeBoolMatrix', () => {
        [
            { input: [[false]], output: false },
            { input: [[true]], output: true },
            { input: [[false, true], [false, false]], output: true },
            { input: [[false, false], [false, true]], output: true }
        ].forEach(({input, output}) => {
            fit(`should "and" all fields of ${JSON.stringify(input)}`, () => {
                expect(rotation.squeezeBoolMatrix(input)).toEqual(output)
            })
        })
    })
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

    fdescribe('getTruthyCoordinatesFromMatrix', () => {
        // [
        //     {
        //         xx: [
        //             [false, false]
        //             [false, false]
        //         ],
        //         result: []
        //     },
        //     {
        //         xx: [
        //             [true,  true]
        //             [false, false]
        //         ],
        //         result: [
        //             {x:0, y:0},
        //             {x:0, y:1}
        //         ]
        //     }
        // ].forEach(({input, result}) => {
        //     console.log('##########', xx, result)
        //     it(`should turn ${JSON.stringify(xx)} into ${result}`, () => {
        //         console.log('???', xx)
        //         expect(rotation.getTruthyCoordinatesFromMatrix(xx)).toEqual(result)
        //     })
        // })

        [
            { input: [[false, false], [false, false]], output: [] },
            { input: [[true, false ], [false, false]], output: [{x: 0, y: 0}] },
            { input: [[true, false ], [false, true]], output: [{x: 0, y: 0}, {x:1, y:1}] },
        ].forEach(({input, output}) => {
            it(`should turn ${JSON.stringify(input)}, to ${JSON.stringify(output)}`, () => {
                expect(rotation.getTruthyCoordinatesFromMatrix(input)).toEqual  (output)
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

    describe('invariant', () => {
        it('should always be true', () => {
            const result = jsc.checkForall(
                jsc.suchthat(
                    jsc.array(jsc.array(jsc.number)), 
                    rotation.isSquare
                ),
                (squaredMatrix) => {
                    const by90 = rotation.rotateRight(squaredMatrix)
                    const by180 = rotation.rotateRight(by90)
                    const by270 = rotation.rotateRight(by180)
                    const by360 = rotation.rotateRight(by270)
                    return JSON.stringify(squaredMatrix) === JSON.stringify(by360)
                }
            )

            expect(result).toBe(true)
        })
    });

})