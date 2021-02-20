import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function LandingPage({history}) {

    const [allWallets, setAllWallets] = useState([])

    useEffect(() => {

        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => setAllWallets(data.allWallets))


    }, [])

    const [currentUser, setCurrentUser] = useState(null)

    const handleUserSelection = (event) => {

        if (event.target.value !== '---') {
            setCurrentUser(event.target.value)
        }

    }

    return (
        <Fragment>

            <div className="container" align="center">

                <section className='my-5 w-100' >
                    <div className="card p-5">
                        <form className='d-flex flex-column align-items-center'>

                            <label htmlFor="userSelect" className="bmd-label-floating">Select User ID</label>
                            <select className="form-control" id="userSelect" onChange={handleUserSelection} >
                                <option> {null} </option>
                                {allWallets.map(wallet => <option key={wallet.user_id} align="center"> {wallet.user_id}</option>)}
                            </select>
                            <br />
                            {currentUser ?
                                <Link to={`/user-dashboard/${currentUser}`}>
                                    <button className='btn btn-outline-success m-5'>
                                        User Dashboard
                                    </button>
                                </Link> :
                                <button className='btn btn-outline-primary m-5' disabled>
                                    User Dashboard
                                    </button>
                            }
                        </form>
                    </div>
                </section>


                <button className='btn btn-outline-success w-100' onClick={()=>history.push('/new-wallet')}> New Wallet </button>
                <button className='btn btn-outline-info w-100' onClick={()=>history.push('/all-wallets')}> All Wallets </button>
                <button className='btn btn-outline-info w-100' onClick={()=>history.push('/all-transactions')}> All Transactions </button>

            </div>

        </Fragment>
    )
}

export default withRouter(LandingPage)
