const assert = require('assert');

const validTypes = ['incident', 'bug', 'task'];
const isValidType = (t) => validTypes.includes(t);

assert.strictEqual(isValidType('incident'), true);
assert.strictEqual(isValidType('feature'), false);
console.log("typeEnum unit test passed.");
