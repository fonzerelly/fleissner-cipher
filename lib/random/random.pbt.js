const { random, seed } = require('./random')
const jsc = require('jsverify')
const R = require('ramda')

describe('random', () => {
    it('should never be greater than max', () => {
        const result = jsc.checkForall(jsc.string, (seedValue) => {
            seed(seedValue)
            const result = [random(), random(), random()]
            return R.all((r) => r < 1, result)
        })
        expect(result).toBe(true);
    })
})