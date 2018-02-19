import React, {Component} from 'react';
import {withApollo} from 'react-apollo'
import {gql, compose, graphql} from 'react-apollo';
import Loader from '../components/Loader';
import MuppetCard from '../components/MuppetCard';

class RandomMuppetContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {getRandomMuppet: {loading, randomMuppet}} = this.props;

    if (loading) {
      return <Loader loadingText={"loading random muppet"} size={20} fontSize={14}/>;
    }

    const MuppetData = randomMuppet[0];

    return (
      <div>
        <MuppetCard muppetData={MuppetData}/>
      </div>
    )
  }
}

const GET_RANDOM_MUPPET_QUERY = gql`
query randomMuppet {
  randomMuppet {
    ID
    Title
    Description
    Thumbnail
  }
} 
`;

export default compose(
  withApollo,
  graphql(GET_RANDOM_MUPPET_QUERY, {name: 'getRandomMuppet'}),
)(RandomMuppetContainer);
