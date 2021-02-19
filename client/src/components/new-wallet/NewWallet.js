import React, { Fragment, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'


function NewWallet({ history, location, match }) {

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [balance, setBalance] = useState('')


    const handleSubmit = async event => { 
        event.preventDefault()
        
        const response = await fetch('http://localhost:3000/user', {
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({ username, phone, balance })
        })

        if (response.ok) {
            history.push('/new-wallet/success')
        } else {
            window.alert("New Wallet Creation Failed!")
        }

    }

    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> NEW WALLET </h3>
            <hr />
            <form className='px-3' onSubmit={handleSubmit}>

                <div className='form-group'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New Wallet Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Initial Balance (Rs.)"
                        value={balance}
                        onChange={event => setBalance(event.target.value)}
                    />
                </div>

                <button className='btn btn-outline-success mt-5' type='submit'> Create New Wallet </button>

            </form>
            <Link to='/'> Cancel </Link>
        </div>
    </Fragment>

}

export default withRouter(NewWallet)
