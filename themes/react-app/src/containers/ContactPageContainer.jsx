import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withApollo, compose, gql, graphql } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Recaptcha from 'react-recaptcha';
import {fulfillFetchSingleMuppet, rejectFetchSingleMuppet} from "../actions/modalActions";

// site key
const sitekey = '6LdBBUcUAAAAACcnoR4CCBcaq9bW2AslLRcE8uNu';

// define a variable to store the recaptcha instance
let recaptchaInstance;

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

  callback = () => {
    console.log('reCAPTCHA callback');
  };

  expiredCallback = () => {

  };

  verifyCallback = (response) => {
    this.sendContactForm(response);
  };

  executeCaptcha = () => {
    recaptchaInstance.execute();
  };

  resetRecaptcha = () => {
    recaptchaInstance.reset();
  };

  sendContactForm = async (captchaToken) => {

    await this.props.contactFormMutation({
      variables: {
        recaptchaToken: captchaToken,
        name: this.state.firstName,
        email: this.state.email,
        desc: this.state.message
      }
    }).then((res) => {

      this.resetRecaptcha();
    }).catch((err) => {

    });

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
          <Recaptcha
            ref={e => recaptchaInstance = e}
            sitekey={sitekey}
            size="invisible"
            render="explicit"
            badge="inline" // bottomright || bottomleft || inline
            verifyCallback={(res) => this.verifyCallback(res)}
            onloadCallback={() => this.callback()}
            expiredCallback={() => this.expiredCallback()}
          />
          <Button
            onClick={() => this.resetRecaptcha()}
            className={classes.button} color="primary">
            <Icon className={classes.rightIcon}>reset reCAPTCHA</Icon>
          </Button>
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

const SUBMIT_CONTACT_FORM_MUTATION = gql`
  mutation createForm($recaptchaToken: String!, $name: String!, $email: String!, $desc: String!) {
  submitContactForm(
    recaptchaToken: $recaptchaToken,
    Name:$name,
    Email: $email,
    Description: $desc
  ) {
    ID
    Name
    Email
    Description
  }
}
`;

export default compose(
  withApollo,
  graphql(SUBMIT_CONTACT_FORM_MUTATION, {name: 'contactFormMutation'}),
  withStyles(styles)
)(ContactPageContainer);
