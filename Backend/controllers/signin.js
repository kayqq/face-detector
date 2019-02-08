const handleSignin = (req, res, db, bcrypt, jwt ) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json(null)
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        // if login info matches data in login table, then return corresponding user data in users table
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            // .then returns an array, so choose array element [0]
            .then(user => {
                // return object with user, token
                const email = user[0].email;
                const token = jwt.sign({email}, 'secretkey')
                res.json({
                    token: token, 
                    user: user[0]
                })  
            })
            .catch(err => res.status(400).json(null))
        } else {
            res.status(400).json(null)
        }
    })
    .catch(err => res.status(400).json(null))
}

module.exports = {
    handleSignin: handleSignin
}