import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {darken, fade, emphasize, lighten} from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  messageContainer: {
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'height': '100%',
    'position': 'absolute',
    'padding': '30px',
    'box-sizing': 'border-box',
    color: theme.palette.error.main,
    'background-color': fade(theme.palette.error.main, 0.2)
  }
});

function ErrorMessage(props) {
  const { classes, message } = props;
  return (
    <div className={classes.messageContainer}>
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(ErrorMessage);