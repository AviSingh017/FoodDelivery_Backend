const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(404).send({"msg": "Token not found"});
    }

    const decodedToken = jwt.verify(token, process.env.Jwt_secret);
    req.userData = { userId: decodedToken.userId };
    next();

  }
  catch(error) {
    res.status(401).json({ "msg": "User Not Authenticated"});
  }
};

module.exports = {auth};
