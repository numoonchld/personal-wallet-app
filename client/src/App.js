import './App.css';
import React, { Fragment } from 'react'
import { Switch, Route, Link , withRouter} from 'react-router-dom'
import LandingPage from './components/landing-page/LandingPage'
import UserDashboard from './components/user-dashboard/UserDashboard'
import NewWallet from './components/new-wallet/NewWallet'
import NewWalletSuccess from './components/new-wallet/NewWalletSuccess'
import AllWallets from './components/all-wallets/AllWallets'
import AllTransactions from './components/all-transactions/AllTransactions'
import AddFunds from './components/add-funds/AddFunds'
import SpendFunds from './components/spend-funds/SpendFunds'


function App() {

  return <Fragment>

    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/user-dashboard/:currentUser' component={UserDashboard} />
      <Route exact path='/new-wallet' component={NewWallet} />
      <Route path='/new-wallet/success' component={NewWalletSuccess} />
      <Route path='/all-wallets' component={AllWallets} />
      <Route path='/all-transactions' component={AllTransactions} />
      <Route path='/add-funds/:currentUser' component={AddFunds} />
      <Route path='/spend-fund/:currentUser' component={SpendFunds} />
    </Switch>
  

  </Fragment>

}

export default withRouter(App);
