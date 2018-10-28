// the initial seed
let seed = (new Date()).getTime();
const hashCode = (str) => {
    let hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
const seededRandom = function () {
    const max = 1;
    const min = 0;

    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;

    return Math.abs(min + rnd * (max - min));
}

module.exports = {
    random: seededRandom,
    seed: (s) => {
        s = s || (new Date()).getTime()
        seed = hashCode(s.toString())
    }
}
