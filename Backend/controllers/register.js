const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }

    // check for existing email
    db.select('email').from('users')
    .where('email', '=', email)
    .then(data => {
        if(data.length === 0) {
            // No existing user by email
            const hash = bcrypt.hashSync(password);
            // Transactions: All processes must complete or all will fail
            db.transaction(trx => {
                // Insert hash and email into login table
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                // Insert new user info into user table
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        // Send Response
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                // Commit changes to tables if all changes were made successfully
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => res.status(400).json('Unable to register'))
        } else {
            res.status(400).json('email already exists')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))






    



}

module.exports = {
    handleRegister: handleRegister
}