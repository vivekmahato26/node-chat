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
        console.log(token);
        // const verifyToken = jwt.verify(token, "secretKey");
        // if (verifyToken) {
console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));
            const decodedToken = jwt.decode(token, "secretKey");
            console.log(decodedToken);
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
        // } else {
        //     req.isAuth = false;
        //     return next();
        // }
    } catch (error) {
        console.log(error)
        req.isAuth = false;
        return next();
    }

}