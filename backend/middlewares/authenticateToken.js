const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];

    console.log(token);
    if(!token) {
        return res.status(401).json({ message: "Token is missing"});

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch(err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticateToken;