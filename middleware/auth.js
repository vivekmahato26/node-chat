const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    try {
        const verifyToken = jwt.verify(token, "secretKey");
        if (verifyToken) {
            const decodedToken = jwt.decode(token, "secretKey");
            const keys = Object.keys(decodedToken);
            if (keys.length) {
                req.isAuth = true;
                req.userId = decodedToken.userId;
                req.email = decodedToken.email;
                return next();
            } else {
                req.isAuth = false;
                return next();
            }
        } else {
            req.isAuth = false;
            return next();
        }
    } catch (error) {
        console.log(error)
        req.isAuth = false;
        return next();
    }

}