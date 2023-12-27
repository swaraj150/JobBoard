var jwt = require('jsonwebtoken');
const JWT_SECRET = "sWARAJ$aNDHALE@20";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        if (!req.user) {
            return res.status(401).json({ error: "Invalid token: No user data found" });
        }
        next();
    } catch (error) {
        res.status(401).send({ message: "Please authenticate using a valid token" });
    }
}
module.exports = fetchUser;