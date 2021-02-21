import React, { Fragment, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

function SpendFunds({ match, history }) {

    const { currentUser } = match.params

    const user_id = currentUser
    const [amount, setAmount] = useState('')
    const [remarks, setRemarks] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        const body = { user_id, amount, remarks }

        const response = await fetch('http://localhost:3000/spendFunds', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            history.push(`/new-transaction/success/${currentUser}`)
        } else {
            window.alert("New Wallet Creation Failed!")
        }

    }

    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> SPEND FUNDS FROM WALLET </h3>
            <p className='text-muted'> (FOR USER ID: {currentUser}) </p>
            <hr />
            <form className='px-3' onSubmit={handleSubmit}>

                <div className='form-group'>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Amount to Spend (Rs.)"
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Remarks"
                        value={remarks}
                        onChange={event => setRemarks(event.target.value)}
                    />
                </div>

                <button className='btn btn-outline-warning mt-5' type='submit'> SPEND </button>

            </form>
            <Link to={`/user-dashboard/${parseInt(user_id)}`}> Cancel </Link>
        </div>
    </Fragment>
}

export default withRouter(SpendFunds)
