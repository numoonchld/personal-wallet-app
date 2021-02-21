import './App.css';
import React, { Fragment } from 'react'
import { Switch, Route, Link , withRouter} from 'react-router-dom'
import LandingPage from './components/landing-page/LandingPage'
import UserDashboard from './components/user-dashboard/UserDashboard'
import NewWallet from './components/new-wallet/NewWallet'
import NewWalletSuccess from './components/new-wallet/NewWalletSuccess'
import AllWallets from './components/all-wallets/AllWallets'
import AllTransactions from './components/all-transactions/AllTransactions'
import NewTransactionSuccess from './components/all-transactions/NewTransactionSuccess'
import AddFunds from './components/add-funds/AddFunds'
import SpendFunds from './components/spend-funds/SpendFunds'
import UserTransactions from './components/user-dashboard/UserTransactions'


function App() {

  return <Fragment>

    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/user-dashboard/:currentUser' component={UserDashboard} />
      <Route exact path='/new-wallet' component={NewWallet} />
      <Route path='/new-wallet/success' component={NewWalletSuccess} />
      <Route path='/new-transaction/success/:currentUser' component={NewTransactionSuccess} />
      <Route path='/all-wallets' component={AllWallets} />
      <Route path='/all-transactions' component={AllTransactions} />
      <Route path='/add-funds/:currentUser' component={AddFunds} />
      <Route path='/spend-funds/:currentUser' component={SpendFunds} />
      <Route path='/user-transactions/:currentUser' component={UserTransactions} />
    </Switch>
  

  </Fragment>

}

export default withRouter(App);
