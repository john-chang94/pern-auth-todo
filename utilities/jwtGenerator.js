const jwt = require('jsonwebtoken');
// after npm install, run this to allow access to environment variables
require('dotenv').config();

function jwtGenerator(user_id) {
    const payload = {
        id: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 }) // 1 hour
}

module.exports = jwtGenerator;