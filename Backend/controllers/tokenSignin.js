const handleTokenSignin = (req, res, db, jwt ) => {
    const { token } = req.body;
        const decoded = jwt.verify(token, 'secretkey');
        // Query db for user with email = to email in token
        db.select('email').from('login')
        .where('email', '=', decoded.email)
            .then(data => {
                if (data) {
                    return db.select('*').from('users')
                    .where('email', '=', decoded.email)
                    .then(user => {
                        res.json(user[0])           
                    })
                    .catch(err => res.status(400).json('Unable to authenticate with token'))
                }
            })
            .catch(err => res.status(400).json('Invalid token'))
}

module.exports = {
    handleTokenSignin: handleTokenSignin
}