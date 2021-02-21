import React, { Fragment } from 'react'

function TransactionItem({ transaction }) {

    // console.log(transaction)

    const { username, transaction_date, transaction_type, amount, final_balance } = transaction
    // console.log({ username, transaction_date, amount, final_balance })

    const transaction_date_js = new Date(transaction_date)
    console.log(transaction_date_js)

    // const trans_year = transaction_date_js.getFullYear()
    // const trans_month
    // const trans_date
    // const trans_hour
    // const trans_min

    return <Fragment>

        <div className='container'>
            <div className='card my-5'>

                <div className='card-header'>
                    <div className='card-title'>
                        <h5 className='text-info'>{username}</h5>
                    </div>
                    <div className='card-subtitle text-muted'>
                        <p >{transaction_date_js.toDateString()}</p>
                        <p >{transaction_date_js.toTimeString()}</p>
                    </div>
                </div>
                <div className='card-body'>
                    <h5>
                        <b className={transaction_type ? `text-danger` : `text-success`}>
                            Rs. {amount / 100}
                        </b>

                    </h5>
                    <p>  <b>{transaction_type ? `(WITHDRAWAL)` : `(DEPOSIT)`}</b> </p>
                </div>
                <div className='card-footer'>
                    <p> Remaining Balance: </p>
                    <p className='text-success'> Rs. {final_balance / 100} </p>
                </div>


            </div>
        </div>

    </Fragment>
}

export default TransactionItem
