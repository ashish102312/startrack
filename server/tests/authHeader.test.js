const assert = require('assert');

const parseToken = (header) => {
    if (!header) return null;
    return header.trim();
};

assert.strictEqual(parseToken("abc123token"), "abc123token");
assert.strictEqual(parseToken(null), null);
console.log("authHeader unit test passed.");
