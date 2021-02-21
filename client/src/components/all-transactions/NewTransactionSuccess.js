import React, { Fragment, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

function NewTransactionSuccess({ history , match}) {

    const { currentUser } = match.params

    return <Fragment>

        <div className="container py-5" align='center'>

            <div style={{ height: '70vh', width: '90vw' }} className='bg-success d-flex flex-column justify-content-center align-items-center'>
                <i className="fas fa-check-circle fa-10x"></i>
                <p className='my-5'> New Transaction Successful!</p>
            </div>

            <button className='btn btn-outline-info w-75 my-5' onClick={() => history.push(`/user-dashboard/${parseInt(currentUser)}`)}> Done </button>

        </div>


    </Fragment>
}

export default withRouter(NewTransactionSuccess)
