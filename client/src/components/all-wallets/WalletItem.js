import React, { Fragment } from 'react'

function WalletItem({ wallet }) {
    const { user_id, username, phone, balance } = wallet
    return <Fragment>

        <div className='container'>
            <div className='card my-5'>
                <div className='card-header text-light bg-dark'>

                    <div className='card-title'>
                        <h5 >{username}</h5>
                    </div>
                </div>
                <div className='card-body bg-success'>
                    <p> BALANCE </p>
                    <h4 className=''> <b>Rs. {balance / 100}</b> </h4>
                </div>
                <div className='card-footer bg-primary'>
                    <div className='card-subtitle text-light'>
                        <p >USER ID <br/> <b>{user_id}</b></p>
                        <p> PHONE <br/><b>{phone}</b></p>
                    </div>
                </div>

            </div>
        </div>

    </Fragment>
}

export default WalletItem
