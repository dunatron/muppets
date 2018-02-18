import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withApollo, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Recaptcha from 'react-recaptcha';

// site key
const sitekey = '6LdBBUcUAAAAACcnoR4CCBcaq9bW2AslLRcE8uNu';

// specifying your onload callback function
// const callback = () => {
//   console.log('Done!!!!');
// };
//
// const verifyCallback = (response) => {
//   console.log(response);
// };

// const expiredCallback = () => {
//   console.log(`Recaptcha expired`);
// };

// define a variable to store the recaptcha instance
let recaptchaInstance;

// handle reset
// const resetRecaptcha = () => {
//   recaptchaInstance.reset();
// };

// const executeCaptcha = () => {
//   recaptchaInstance.execute();
//   console.log('fire instance');
// };

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px'
  },
  legend: {
    fontSize: '22px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    maxWidth: 340,
    minWidth: 220
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ContactPageContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      message: ''
    };
  }

  componentDidMount() {
    console.log('ContactPageContainer.jsx mounted with the following props: ', this.props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.executeCaptcha();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // specifying your onload callback function
  // callback = function () {
  //   console.log('Done!!!!');
  // };
  //
  // // specifying verify callback function
  // verifyCallback = (response) => {
  //   console.log(response);
  //   // document.getElementById("someForm").submit();
  // };
  //

  callback = () => {

  };

  expiredCallback = () => {

  };

  verifyCallback = (response) => {
    console.log(response);
    console.log('execute the form now?')
  };

  executeCaptcha = () => {
    recaptchaInstance.execute();
    console.log('executeCaptcha');
  };

  resetRecaptcha = () => {

  };


  render() {

    const {classes} = this.props;

    return (
      <div>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className={classes.container}
          noValidate
          autoComplete="off">

          <legend className={classes.legend}>Contact Form</legend>
          <TextField
            id="contact-firstName"
            label="Your Name"
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
            margin="normal"
          />
          <TextField
            id="contact-email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            multiline
            id="contact-message"
            label="Message"
            className={classes.textField}
            value={this.state.message}
            onChange={this.handleChange('message')}
            margin="normal"
          />
          <h1>Google Recaptcha</h1>
          <Recaptcha
            ref={e => recaptchaInstance = e}
            sitekey={sitekey}
            size="invisible"
            render="explicit"
            verifyCallback={(res) => this.verifyCallback(res)}
            onloadCallback={() => this.callback()}
            expiredCallback={() => this.expiredCallback()}
          />
          <br/>
          <button
            onClick={() => this.resetRecaptcha()}
          >
            Reset
          </button>

          <Button
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
            className={classes.button} variant="raised" color="primary">
            <Icon className={classes.rightIcon}>Submit</Icon>
          </Button>
        </form>
      </div>
    )
  }
}

ContactPageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withApollo,
  withStyles(styles)
)(ContactPageContainer);
