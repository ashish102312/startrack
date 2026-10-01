const assert = require('assert');

const isEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

assert.strictEqual(isEmail("test@example.com"), true);
assert.strictEqual(isEmail("invalid-email"), false);
console.log("emailValidation unit test passed.");
