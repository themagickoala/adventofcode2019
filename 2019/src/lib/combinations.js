function fact(n) {
    return n > 1 ? n * fact(n-1) : 1;
}

function comb(n, r) {
    return fact(n)/(fact(r)*fact(n-r));
}

module.exports = {
    fact,
    comb,
};