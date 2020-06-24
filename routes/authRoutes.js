const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utilities/jwtGenerator');
const validate = require('../middleware/validate');
const authorizeToken = require('../middleware/authorizeToken');

// validate will check req.body to make sure all fields are valid
router.post('/register', validate, async (req, res) => {
    try {
        // Destructure req.body
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        )
        // Throw error if user exists
        if (user.rows.length !== 0){
            return res.status(401).json('User already exists')
        }

        // Hash user's password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Enter new user into db
        const newUser = await pool.query(
            `INSERT INTO users (user_name, user_email, user_password)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, email, hashedPassword]
        )

        // Generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.post('/login', validate, async (req, res) => {
    try {
        // Destructure req.body
        const { email, password } = req.body;

        // Check if user does not exist
        const user = await pool.query(
            'SELECT * FROM users WHERE user_email = $1',
            [email]
        )
        if (user.rows.length === 0) {
            return res.status(401).send('Email or password is incorrect');
        }

        // Check if entered password match password in db
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password) // returns boolean
        if (!validPassword) {
            return res.status(401).send('Email or password is incorrect');
        }

        // Provide a jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
    }
})

// As long as the stored token is verified, return true (for client-side rendering)
router.get('/verify', authorizeToken, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;