import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MuppetCard from './MuppetCard';

function getModalStyle() {
  const marginSides = 'auto';
  const marginTopBot = 20;

  return {
    marginBottom: `${marginTopBot}px`,
    marginTop: `${marginTopBot}px`,
    marginLeft: `${marginSides}`,
    marginRight: `${marginSides}`,
  };
}

const styles = theme => ({
  root: {
    overflow: 'scroll'
  },
  paper: {
    position: 'relative',
    minWidth: theme.spacing.unit * 32,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    height: 'fit-content',
    minHeight: '250px',
    padding: '0'
  },
  closeIcon: {
    position: "absolute",
    zIndex: 100
  }
});

class MuppetModal extends React.Component {

  render() {
    const {classes, muppetData: {currentMuppet, error, fetched, fetching}} = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="muppet-modal-title"
          aria-describedby="muppet-modal-description"
          open={this.props.isOpen}
          onClose={this.props.closeModal}
          className={classes.root}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <IconButton onClick={this.props.closeModal} className={classes.closeIcon} color={"primary"}>
              <CloseIcon/>
            </IconButton>
            {fetching &&
              <Loader loadingText={"Loading Muppet Data"} size={40} fontSize={22}/>
            }
            {!fetching && error &&
              <ErrorMessage message={error.message} />
            }
            {!fetching && !error &&
              <MuppetCard muppetData={currentMuppet} />
            }
          </div>
        </Modal>
      </div>
    );
  }
}

MuppetModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  muppetData: PropTypes.object.isRequired
};

export default withStyles(styles)(MuppetModal);

