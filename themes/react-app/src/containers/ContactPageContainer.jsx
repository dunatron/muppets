import React, {Component} from 'react';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import { compose} from 'react-apollo';

const styles = theme => ({

});

class ContactPageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ContactPageContainer.jsx mounted with the following props: ', this.props)
  }

  render() {

    const {classes} = this.props;

    return (
      <div>
        <h1>Contact Page</h1>
      </div>
    )
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(ContactPageContainer);
