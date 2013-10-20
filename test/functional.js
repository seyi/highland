var h = require('../highland');


exports['curry'] = function (test) {
    var fn = h.curry(function (a, b, c, d) {
        return a + b + c + d;
    });
    test.equal(fn(1,2,3,4), fn(1,2)(3,4));
    test.equal(fn(1,2,3,4), fn(1)(2)(3)(4));
    var fn2 = function (a, b, c, d) {
        return a + b + c + d;
    };
    test.equal(h.curry(fn2)(1,2,3,4), h.curry(fn2,1,2,3,4));
    test.equal(h.curry(fn2)(1,2,3,4), h.curry(fn2,1,2)(3,4));
    test.done();
};

exports['ncurry'] = function (test) {
    var fn = h.ncurry(3, function (a, b, c, d) {
        return a + b + c + (d || 0);
    });
    test.equal(fn(1,2,3,4), 6);
    test.equal(fn(1,2,3,4), fn(1,2)(3));
    test.equal(fn(1,2,3,4), fn(1)(2)(3));
    var fn2 = function () {
        var args = Array.prototype.slice(arguments);
        return args.reduce(function (a, b) { return a + b; }, 0);
    };
    test.equal(h.ncurry(3,fn2)(1,2,3,4), h.ncurry(3,fn2,1,2,3,4));
    test.equal(h.ncurry(3,fn2)(1,2,3,4), h.ncurry(3,fn2,1,2)(3,4));
    test.done();
};

exports['compose'] = function (test) {
    function prepend(x) {
        return function (str) {
            return x + str;
        };
    }
    var fn1 = prepend('one:');
    var fn2 = prepend('two:');
    var fn = h.compose(fn2, fn1);
    test.equal(fn('zero'), 'two:one:zero');
    // partial application
    test.equal(h.compose(fn2)(fn1)('zero'), 'two:one:zero');
    test.done();
}

exports['top level map function - array'] = function (test) {
    var mul2 = function (x) {
        return x * 2;
    };
    h.map(mul2, [1,2,3]).toArray(function (xs) {
        test.same(xs, [2,4,6]);
        test.done();
    });
};

exports['top level map function curry - array'] = function (test) {
    var mul2 = function (x) {
        return x * 2;
    };
    var mapper = h.map(mul2);
    mapper([1,2,3]).toArray(function (xs) {
        test.same(xs, [2,4,6]);
        test.done();
    });
};
