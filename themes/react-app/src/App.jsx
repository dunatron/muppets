import React, {Component} from 'react';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';

// Pages
import HomePage from './containers/HomePageContainer';

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
        <HomePage />
      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
