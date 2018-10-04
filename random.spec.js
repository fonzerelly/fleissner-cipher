const { random, seed } = require('./random')
const jsc = require('jsverify')
const R = require('ramda')

xdescribe('random', () => {
    it('should generate different values every times it gets called', () => {
        const randomResults = [random(), random(), random()]
        expect(randomResults[0]).not.toEqual(randomResults[1])
        expect(randomResults[0]).not.toEqual(randomResults[2])
        expect(randomResults[1]).not.toEqual(randomResults[2])
    })
    it('should return values between 0 and 1 by default', () => {
        const randomResults = [random(), random(), random()]
        randomResults.forEach((value) => {
            expect(value).toBeGreaterThanOrEqual(0)
            expect(value).toBeLessThan(1)
        })
    })
    
    it('should be seedable to repeat random values', () => {
        seed(42)
        const randomResultsFirst = [random(), random(), random()]
        seed(42)
        const randomResultsSecond = [random(), random(), random()]
        expect(randomResultsFirst).toEqual(randomResultsSecond)
    })

    it('should be seedabel with any kind of value', () => {
        seed('sambeneli')
        expect(random).not.toThrow()
        expect(isNaN(random())).toBe(false)
        seed({a: 42})
        expect(random).not.toThrow()
        expect(isNaN(random())).toBe(false)
        seed((a, b) => {return a + b})
        expect(random).not.toThrow()
        expect(isNaN(random())).toBe(false)
    })

    it('should take seed from Date when null passed', () => {
        spyOn(Date.prototype, 'getTime').and.returnValue(1536953832159);
        seed(null)
        const first = [random(), random(), random()]
        seed((new Date()).getTime())
        const second = [random(), random(), random()]
        expect(first).toEqual(second);

        jest.restoreAllMocks()
    })
})
xdescribe('invariant', () => {
    fit('should never be greater than max', () => {
        const result = jsc.checkForall(jsc.string, (seedValue) => {
            seed(seedValue)
            return R.all((r) => r < 1, [random(), random(), random()])
        })
        expect(result).toBe(true);
    })
})