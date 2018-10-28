const rotation = require('./rotation')
const jsc = require('jsverify')

describe('rotation', () => {
    it('should always be equal to its four time rotated counterpart', () => {
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