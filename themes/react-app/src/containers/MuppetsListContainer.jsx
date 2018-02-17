import React, {Component} from 'react';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import { compose, gql, graphql} from 'react-apollo';
import MuppetChip from '../components/MuppetChip';

const styles = theme => ({

});

class MuppetsListContainer extends Component {

  render() {

    const {classes, allMuppetsQuery: {loading, readMuppets}} = this.props;
    console.log('MuppetsListContainerProps:', this.props);

    if(loading) {
      return <div>Loading</div>
    }

    return (
      <div>
        {readMuppets.edges && readMuppets.edges.map((edge, index) => (
          <MuppetChip
            key={index}
            onClick={()=> {console.log('chip click')}}
            label={edge.node.Title}
            imgSrc={edge.node.ChipImage}
          />
        ))}
      </div>
    )
  }

}

const ALL_MUPPETS_QUERY = gql`
  query allMuppetsQuery {
  readMuppets {
    edges {
      node {
        ID
        Title
        ChipImage
      }
    }
  }
}
`;

export default compose(
  withApollo,
  graphql(ALL_MUPPETS_QUERY,{name: 'allMuppetsQuery'}),
  withStyles(styles)
)(MuppetsListContainer);
