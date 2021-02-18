import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function UserDashboard({ history, location, match }) {

    // console.log(match.params)
    const { currentUser } = match.params
    // console.log(currentUser)

    const [currentUserInfo, setCurrentUserInfo] = useState({})

    useEffect(() => {

        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => {
                // console.log('Log 1: ',data.allWallets.filter(wallet => wallet.user_id == currentUser)[0])
                setCurrentUserInfo(data.allWallets.filter(wallet => wallet.user_id == currentUser)[0])

            })

    }, [])




    return <Fragment>
        <div className="container">

            <div className='d-flex flex-column align-items-center py-5'>

                <Link to='/'><button className='btn btn-outline-secondary'> Home </button></Link>

                <section className='m-5 w-50'>
                    <div className="card" align='center'>
                        <div className='card-header' >
                            <p>Username</p>
                            <h6 >{currentUserInfo.username}</h6>
                            <hr />
                            <p>User ID</p>
                            <h6 >{currentUserInfo.user_id}</h6>
                        </div>
                        <div className='card-body'>
                            <p>Current Balance</p>
                            <h2> Rs. {currentUserInfo.balance / 100}</h2>
                        </div>

                    </div>
                </section>
            </div>


        </div>

    </Fragment>


}
