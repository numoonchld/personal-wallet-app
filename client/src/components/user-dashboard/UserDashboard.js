import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

function UserDashboard({ history, location, match }) {

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
        <div className="container py-5">

            <div className='d-flex flex-column align-items-center'>

                <button className='btn btn-outline-secondary' onClick={() => history.push('/')}> Home </button>

                <section className='my-5'>
                    <div className="p-2" align='center'>
                        <div className='card-title' >
                            <p>Username</p>
                            <h4 >{currentUserInfo.username}</h4>
                        </div>
                        <div className='text-muted' >
                            <p>(User ID: <b>{currentUserInfo.user_id}</b>)</p>
                        </div>
                        <hr/>
                        <div className=''>
                            <p>Current Balance</p>
                            <h4 className='text-success'> <strong>Rs. {currentUserInfo.balance / 100}</strong></h4>
                        </div>

                    </div>
                </section>
            </div>


        </div>

    </Fragment>

}

export default withRouter(UserDashboard)