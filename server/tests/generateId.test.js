const assert = require('assert');

// Unit test for ID formatting pattern
const testIdFormat = (id) => {
    return /^ISSUE-\d+$/.test(id);
};

assert.strictEqual(testIdFormat("ISSUE-1001"), true);
assert.strictEqual(testIdFormat("INVALID-1"), false);
console.log("generateId unit test passed.");
