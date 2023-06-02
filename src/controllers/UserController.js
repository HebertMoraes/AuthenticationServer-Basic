const jwt = require('jsonwebtoken');
const usersFakeDb = require('../../usersFakeDb.json');

module.exports =
{
    async Login(req, res, next) {

        if (module.exports.searchUser(req.body.email, req.body.password)) {

            const acess_token = jwt.sign({}, "exemploDeSecretJWT", {
                expiresIn: 150 // expires in 2,5 min
                // expiresIn: 80
            });

            const refresh_token = jwt.sign({}, "exemploDeSecretJWT", {
                // expiresIn: 300 // expires in 5 min
                expiresIn: 1000000000000000000000000000
            });

            return res.json(
                {
                    auth: true,
                    access_token: acess_token, 
                    refresh_token: refresh_token
                }
            );
        } else {
            res.status(401).json({ message: 'Login inválido!' });
        }
    },

    async RefreshAcessToken(req, res, next) {

        try {
            jwt.verify(req.body.refresh_token, "exemploDeSecretJWT");

            const acess_token = jwt.sign({}, "exemploDeSecretJWT", {
                expiresIn: 150 // expires in 2,5 min
                // expiresIn: 80
            });
            return res.json(
                {
                    auth: true,
                    access_token: acess_token
                }
            );

        } catch (error) {
            res.status(498).json({ message: 'Refresh token expirado!' });
        }
    },

    searchUser: function (emailToVerify, passwordToVerify) {
        const allUsers = usersFakeDb.allUsers;
        if (allUsers[0].email === emailToVerify && allUsers[0].password === passwordToVerify) {
            return true;
        } else if (allUsers[1].email === emailToVerify && allUsers[1].password === passwordToVerify) {
            return true;
        } else {
            return false;
        }
    }
}
