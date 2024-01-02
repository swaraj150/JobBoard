var jwt = require('jsonwebtoken');
const JWT_SECRET = "sWARAJ$aNDHALE@20";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please provide a valid authentication token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        if (!data.user) {
            return res.status(401).json({ error: "Invalid token: No user data found" });
        }
        req.user = data.user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(401).send({ error: "Invalid token: Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;