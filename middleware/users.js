const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        //username min length 3
        //password min 6chars
        if(!req.body.username || req.body.username.length < 3){
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
        try{
            const token = req.headers.au
        } catch(err){
            throw err;
            return 
        }
    }
}