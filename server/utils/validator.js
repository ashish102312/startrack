const isValidObjectId = (id) => {
    return typeof id === 'string' && id.length > 0;
};

module.exports = { isValidObjectId };
