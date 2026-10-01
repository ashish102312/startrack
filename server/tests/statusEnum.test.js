const assert = require('assert');

const validStatuses = ['open', 'in_progress', 'resolved'];
const isValidStatus = (s) => validStatuses.includes(s);

assert.strictEqual(isValidStatus('open'), true);
assert.strictEqual(isValidStatus('archived'), false);
console.log("statusEnum unit test passed.");
