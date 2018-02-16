import React, {Component} from 'react';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import {gql, compose, graphql} from 'react-apollo';

const styles = theme => ({

});

class HomePageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('HomePage.jsx mounted with the following props: ', this.props)
  }

  render() {

    const {classes} = this.props;

    const {data: {loading}} = this.props;

    if (loading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

const GET_HOME_PAGE_DATA = gql`
  query readHomePage {
  getHomePageFirst {
    ID
    Title
    Intro
    Content
    BannerImage
  }
}
`;

export default compose(
  withApollo,
  graphql(GET_HOME_PAGE_DATA),
  withStyles(styles)
)(HomePageContainer);
