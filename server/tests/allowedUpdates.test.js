const assert = require('assert');

const allowedKeys = ['title', 'description', 'type', 'priority', 'status', 'assignedTo', 'tags'];
const filterUpdates = (body) => {
    const res = {};
    for (const key of Object.keys(body)) {
        if (allowedKeys.includes(key)) res[key] = body[key];
    }
    return res;
};

const input = { title: "Fix", malicious: "true", priority: "high" };
const output = filterUpdates(input);
assert.deepStrictEqual(output, { title: "Fix", priority: "high" });
console.log("allowedUpdates unit test passed.");
