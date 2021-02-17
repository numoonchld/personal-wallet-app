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
const { body } = require('express-validator')

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

        const { username, phone, balance } = req.body
        balanceInPaisa = balance * 100

        const newUserWallet = await pool.query(
            `INSERT INTO personal_wallet (username, phone, balance) VALUES($1, $2, $3) RETURNING *`,
            [username, phone, balanceInPaisa],
        )

        const { user_id } = newUserWallet.rows[0]

        const addBalance = await pool.query(
            `INSERT INTO transactions (user_id, transaction_type, initial_balance, amount, final_balance, remarks) VALUES(${user_id}, FALSE, 0, ${balance}, ${balance}, 'Initial Deposit') RETURNING *`
        )

        const successPayload = {
            newAccount: newUserWallet.rows,
            newTransaction: addBalance.rows
        }

        res.json(successPayload)

    } catch (error) {
        console.log(error.message)
    }
})

// 01. GET USER BALANCE -----------------------------------------------
app.get('/balance/:userID', async (req, res) => {
    try {
        const { userID } = req.params
        const singleUser = await pool.query(
            `SELECT * FROM personal_wallet WHERE user_id=${userID}`
        )


        const balanceInPaisa = singleUser.rows[0].balance

        res.json({ balance: balanceInPaisa / 100 })

    } catch (error) {
        console.log(error.message)
    }
})

// 02. ADD FUNDS -----------------------------------------------
app.put('/addFunds', [
    // Sanitization Check Array
    body('user_id').isNumeric(),
    body('amount').isNumeric(),
    body('remarks').isString().trim()
], async (req, res) => {

    const { user_id, amount, remarks } = req.body

    const amountInPaisa = parseInt(amount) * 100
    // console.log(amountInPaisa)

    const currentUser = await pool.query(
        `SELECT * FROM personal_wallet WHERE user_id=${user_id}`
    )

    const balanceInPaisa = parseInt(currentUser.rows[0].balance)
    const newBalance = amountInPaisa + balanceInPaisa

    const addBalanceTransaction = await pool.query(
        `INSERT INTO transactions (user_id, transaction_type, initial_balance, amount, final_balance, remarks) VALUES(${user_id}, FALSE, ${balanceInPaisa}, ${amountInPaisa}, ${newBalance}, $1) RETURNING *`, [remarks]
    )

    const updateUserBalance = await pool.query(
        `UPDATE personal_wallet SET balance = $1 WHERE user_id = $2 RETURNING *`,
        [newBalance, user_id]
    )

    const successPayload = {
        newBalance: updateUserBalance.rows,
        newTransaction: addBalanceTransaction.rows
    }

    res.json(successPayload)

})

// 03. SPEND FUNDS -----------------------------------------------
app.put('/spendFunds', [
    // Sanitization Check Array
    body('user_id').isNumeric(),
    body('amount').isNumeric(),
    body('remarks').isString().trim()
], async (req, res) => {

    const { user_id, amount, remarks } = req.body

    const amountInPaisa = parseInt(amount) * 100
    // console.log(amountInPaisa)

    const currentUser = await pool.query(
        `SELECT * FROM personal_wallet WHERE user_id=${user_id}`
    )

    const balanceInPaisa = parseInt(currentUser.rows[0].balance)
    const newBalance = - amountInPaisa + balanceInPaisa

    // console.log(newBalance)
    if (newBalance > 0) {
        const spendBalanceTransaction = await pool.query(
            `INSERT INTO transactions (user_id, transaction_type, initial_balance, amount, final_balance, remarks) VALUES(${user_id}, TRUE, ${balanceInPaisa}, ${amountInPaisa}, ${newBalance}, $1) RETURNING *`, [remarks]
        )

        const updateUserBalance = await pool.query(
            `UPDATE personal_wallet SET balance = $1 WHERE user_id = $2 RETURNING *`,
            [newBalance, user_id]
        )

        const successPayload = {
            newBalance: updateUserBalance.rows,
            newTransaction: spendBalanceTransaction.rows
        }

        res.json(successPayload)
    }
    else {
        res.status(404).json({ error: 'Not enough balance!' })
    }



})

// 04. USER TRANSACTIONS -----------------------------------------------
app.get('/transactions/:userID', async (req, res) => { 
    try {
        const { userID } = req.params
        const singleUserTransaction = await pool.query(
            `SELECT * FROM transactions WHERE user_id=${userID}`
        )

        // console.log(singleUserTransaction)
        
        res.json({ transactions: singleUserTransaction.rows })

    } catch (error) {
        console.log(error.message)
    }
})



// SERVER LISTEN ---------------------------------------------------------
// start server listen 
app.listen(3000, '0.0.0.0', () => {
    console.log('NodeJS server started on port 3000')
})