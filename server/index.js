// LOAD DEPENDENCIES ----------------------------------------------------
// load express 
const express = require('express')

// init express app 
const app = express()

// load cors 
const cors = require('cors')

// load db connect
const pool = require('./db')

// load express validator
const { body, validationResult } = require('express-validator')

// MIDDLEWARE ------------------------------------------------------------
// use cors in app 
app.use(cors())
app.use(express.json()) // get only body of request from client side  

// API ROUTES ------------------------------------------------------------

// 00. ADD USER -----------------------------------------------
app.post('/user', [
    // Sanitization Check Array
    body('username').isString().trim().isLength({ min: 6 }),
    body('phone').isString().trim().isLength({ min: 10 }),
    body('balance').isNumeric().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { username, phone, balance } = req.body
        balanceInPaisa = balance * 100
        const newUserWallet = await pool.query(
            `INSERT INTO personal_wallet (username, phone, balance, created_at) VALUES($1, $2, $3, to_timestamp(${Date.now()})) RETURNING *`,
            [username, phone, balanceInPaisa]
        )
        
        res.json(newUserWallet.rows)

    } catch (error) {
        console.log(error.message)
    }
})
// 01. GET USER BALANCE -----------------------------------------------
app.get('/balance/:userID', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { userID } = req.params
        const singleUser = await pool.query(
            `SELECT * FROM personal_wallet WHERE user_id=${userID}`
        )

        console.log(singleUser.rows)
        const balanceInPaisa = singleUser.rows[0].balance
        
        res.json({balance: balanceInPaisa/100})
        
    } catch (error) {
        console.log(error.message)
    }
})

// SERVER LISTEN ---------------------------------------------------------
// start server listen 
app.listen(3000, '0.0.0.0', () => {
    console.log('NodeJS server started on port 3000')
})