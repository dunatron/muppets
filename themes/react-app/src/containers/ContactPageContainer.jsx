import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withApollo, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';


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
    alert('Hold on now, I need to implement reCAPTCHA')
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
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
