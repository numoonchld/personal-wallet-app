import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import TransactionItem from './TransactionItem'

function AllTransactions() {

    const [allTransactions, setAllTransactions] = useState([])

    const getAllTransactions = async () => {
        try {
            const response = fetch('http://localhost:3000/transactions')
                .then(response => response.json())
                .then(data => setAllTransactions(data.allTransactions))
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> ALL TRANSACTIONS </h3>
            <hr />
            <Link to='/'> Cancel </Link>
            <br />
            {allTransactions.map(transaction => <TransactionItem key={transaction.transaction_id} transaction={transaction} />)}
        </div>
    </Fragment>
}

export default withRouter(AllTransactions)
