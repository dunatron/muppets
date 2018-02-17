import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { fade} from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '42px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit * 1.4,
    height: '42px',
    'border-radius': '22px',
    'background-color': fade(theme.palette.primary.main, 0.3),
    '&:hover': {
      'background-color': fade(theme.palette.primary.main, 0.5),
    }
  },
  avatar: {
    height: '42px',
    width: '42px'
  }
});

class MuppetChip extends Component {
  render() {
    const {classes, label, imgSrc} = this.props;
    return (
      <Chip
        avatar={
          <Avatar
          src={imgSrc}
          className={classes.avatar}
          />
        }
        label={label}
        onClick={this.props.onClick}
        className={classes.chip}
      />
    );
  }
}

MuppetChip.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  imgSrc: PropTypes.string
};

export default withStyles(styles)(MuppetChip);