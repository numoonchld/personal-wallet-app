import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function LandingPage() {

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

            <div className="container">

                <section className='my-5'>
                    <div className="card p-5">
                        <form className='d-flex flex-column align-items-center'>

                            <label htmlFor="userSelect" className="bmd-label-floating">Select User ID</label>
                            <select className="form-control" id="userSelect" onChange={handleUserSelection} >
                                <option> {null} </option>
                                {allWallets.map(wallet => <option key={wallet.user_id} align="center"> {wallet.user_id}</option>)}
                            </select>
                            <br />
                            {currentUser ? <Link to={`/user-dashboard/${currentUser}`} ><button className='btn btn-outline-success m-5'> User Dashboard</button></Link> : null }
                        </form>
                    </div>
                </section>
            </div>

        </Fragment>
    )
}

export default withRouter(LandingPage)
