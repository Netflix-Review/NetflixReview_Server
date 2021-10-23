const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        //username min length 3 max length 15
        //password min 6chars
        if(!req.body.username || req.body.username.length < 3 || req.body.username.length>15){
            return res.status(400).send({
                message: "3charater",
            });
        }
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message: "6password",
            });
        }
        if(!req.body.email || req.body.email.length < 1){
            return res.status(400).send({
                message : "1upper",
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {
        const token = req.body.token;
         
        if(!token){
            return res.status(403).send({
                message: "a token is required for authentication",
            });
        }
        try{
            const decoded = jwt.verify(token,'SECRETKEY');
            req.username = decoded;
            console.log(decoded);
        } catch(err){
            return res.status(401).send({
                message: "Invalid token",
            });
        }
        next();
    },
    validateUsername : (req, res, next) => {
        //username min length 3 max length 15
        if(!req.body.cusername || req.body.cusername.length <3 || req.body.cusername.length>15){
            return res.status(400).send({
                message: "3charater upper",
            });
        }
        next();
    }
}