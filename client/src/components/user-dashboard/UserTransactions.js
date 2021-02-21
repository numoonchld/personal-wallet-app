import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import TransactionItem from '../all-transactions/TransactionItem'

function UserTransactions({ history, match }) {

    const { currentUser } = match.params

    const [userTransactions, setUserTransactions] = useState([])

    const getAllTransactions = async () => {
        try {
            const response = fetch(`http://localhost:3000/transactions/${currentUser}`)
                .then(response => response.json())
                .then(data => setUserTransactions(data.transactions))
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])
    return <Fragment>
        <div className='container py-5' align='center'>
            <h1> USER TRANSACTIONS </h1>
            <h6 className='text-muted'> (USER ID: <b>{currentUser}</b>) </h6>
            <hr />
            <Link to={`/user-dashboard/${parseInt(currentUser)}`}> Cancel </Link>
            <br />
            {userTransactions.map(transaction => <TransactionItem key={transaction.transaction_id} transaction={transaction} />)}
        </div>
    </Fragment>
}

export default withRouter(UserTransactions)
