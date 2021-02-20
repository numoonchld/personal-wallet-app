import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link} from 'react-router-dom'
import WalletItem from './WalletItem'

function AllWallets() {

    const [allWallets, setAllWallets] = useState([])

    useEffect(() => {

        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then(data => setAllWallets(data.allWallets))


    }, [])


    return <Fragment>
        <div className='container py-5' align='center'>
            <h3> ALL WALLETS </h3>
            <hr />
            <Link to='/'> Cancel </Link>
            <br />
            { allWallets.map(wallet => <WalletItem key={wallet.user_id} wallet={wallet} /> )}

            
        </div>
    </Fragment>
}

export default withRouter(AllWallets)
