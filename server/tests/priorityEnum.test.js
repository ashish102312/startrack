const assert = require('assert');

const validPriorities = ['high', 'medium', 'low'];
const isValidPriority = (p) => validPriorities.includes(p);

assert.strictEqual(isValidPriority('high'), true);
assert.strictEqual(isValidPriority('critical'), false);
console.log("priorityEnum unit test passed.");
