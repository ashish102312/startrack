const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const secret = process.env.JWT_SECRET || 'startrack_dev_fallback_secret_key_change_in_production';
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
