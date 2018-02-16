import React, {Component} from 'react';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import { compose} from 'react-apollo';

const styles = theme => ({

});

class MuppetsListContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('MuppetsListContainer.jsx mounted with the following props: ', this.props)
  }

  render() {

    const {classes} = this.props;

    return (
      <div>
        <h1>Muppets Character List</h1>
      </div>
    )
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(MuppetsListContainer);
