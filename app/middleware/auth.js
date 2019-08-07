const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send('No token provided');
    try {
        const validate = jwt.verify(token, config.get('jwtKey'));
        req._user = validate;
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};
