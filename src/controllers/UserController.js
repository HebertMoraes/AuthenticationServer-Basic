const jwt = require('jsonwebtoken');

module.exports =
{
    async Login(req, res, next) {
        
        if (req.body.email === 'emailteste@gmail.com' && req.body.password === '1234') {
            const token = jwt.sign({ }, "exemploDeSecretJWT", {
                expiresIn: 300 // expires in 5min
            });
            return res.json({ auth: true, access_token: token });
        }
        res.status(401).json({ message: 'Login inválido!' });
    }
}