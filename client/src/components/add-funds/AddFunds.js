import React, { Fragment, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

function AddFunds({match}) {

    const { currentUser } = match.params

    const user_id = currentUser
    const [amount, setAmount] = useState('')
    const [remarks, setRemarks] = useState('')

    const handleSubmit = async event => { 
        event.preventDefault()
        
        const response = await fetch('http://localhost:3000/addFunds', {
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({ user_id, amount, remarks })
        })

        if (response.ok) {
            // history.push('/new-wallet/success')
        } else {
            window.alert("New Wallet Creation Failed!")
        }

    }

    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> ADD FUNDS TO WALLET </h3>
            <p className='text-muted'> (FOR USER ID: {currentUser}) </p>
            <hr />
            <form className='px-3' onSubmit={handleSubmit}>

                <div className='form-group'>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Amount to Add (Rs.)"
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

                <button className='btn btn-outline-success mt-5' type='submit'> Create New Wallet </button>

            </form>
            <Link to={`/user-dashboard/${parseInt(user_id)}`}> Cancel </Link>
        </div>
    </Fragment>
}

export default withRouter(AddFunds)
