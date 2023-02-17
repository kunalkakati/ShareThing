require('dotenv').config()
const jwt = require('jsonwebtoken');

const jwt_s = "Thisisasecretforauthentication";

const FatchUser = (req, res, next) => {
    const Token = req.header('auth-token');

    if (!Token) { return res.sendStatus(401).json({ Error: "401, assess denied" }) };
    try {
        const data = jwt.verify(Token, jwt_s);
        req.user = data.user;
    } catch (error) {
         res.sendStatus(401).json({ Error: "401, assess denied" })
    }

    next();
}

module.exports = FatchUser;