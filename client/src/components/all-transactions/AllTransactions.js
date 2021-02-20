import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'

function AllTransactions() {

    const [allTransactions, setAllTransactions] = useState([])

    useEffect(() => {

        fetch('http://localhost:3000/transactions')
            .then(response => response.json())
            // .then(data => setAllWallets(data.allTransactions))
            .then(data => console.log(data))


    }, [])

    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> ALL TRANSACTIONS </h3>
            <hr />
            <Link to='/'> Cancel </Link>
            <br />
            {/* { allTransactions.map(transaction => <WalletItem key={0} transaction={transaction} /> )} */}
        </div>
    </Fragment>
}

export default withRouter(AllTransactions)
