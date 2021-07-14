import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import configureStore from './store'
import './App.css'
import WithRoot from './withRoot'
import LandingPage from './components/LandingPage'
import AllCarsPage from './components/AllCarsPage'
import CarDetailPage from './components/CarDetail'
import ModelOrderPage from './components/ModelConfiguration/ModelOrderPage'
import OrderCompletePage from './components/OrderCompletePage';
import teslaLogo from './assets/Vector.png'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store} style={{width: 120, position: 'absolute'}}>
        <img alt='teslaLogo' src={teslaLogo} class='teslaLogo'/>
        <Router history={this.props.history}>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/allCars" exact component={AllCarsPage} />
                    <Route path="/carDetails" exact component={CarDetailPage} />
                    <Route path="/modelOrder" exact component={ModelOrderPage} />
                    <Route path="/finalOrderPage" exact component={OrderCompletePage} />
                </Switch>
            </Router>
      </Provider>
    )
  }
}

export default withWidth()(WithRoot(App))
