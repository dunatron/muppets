import React, {Component} from 'react';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';

import {compose} from 'react-apollo';
import { Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";
// Pages
import HomePage from './containers/HomePageContainer';
import MuppetsListContainer from './containers/MuppetsListContainer';
import ContactPage from './containers/ContactPageContainer';

import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  header: {
    color: theme.palette.primary.main
  }/**/
});

class App extends Component {
  render() {

    const {classes} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="logo"/>
          <img src={logo} className="App-logo" alt="logo"/>
          <img src={WebpackLogo} className="App-logo" alt="logo"/>
        </header>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/muppets' component={MuppetsListContainer}/>
          <Route exact path='/contact' component={ContactPage}/>
        </Switch>
      </div>
    )
  }
}

// export default App;
export default withRouter(compose(
  withStyles(styles)
)(App));
