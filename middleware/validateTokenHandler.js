
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization; // Use lowercase `authorization`
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" });
            }
            req.user = decoded.user; // Attach decoded user info to request object
            console.log(decoded); // Log the decoded token
            next(); // Call next middleware
        });
    } else {
        return res.status(401).json({ message: "No token provided, authorization denied" });
  }
};

module.exports = validateToken;
