import React, {Component} from 'react';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import { compose, gql, graphql} from 'react-apollo';
import Loader from '../components/Loader';
import MuppetModal from '../components/MuppetModal';
import MuppetChip from '../components/MuppetChip';

// Connect Redux
import {connect } from "react-redux";
import {
  startFetchSingleMuppet,
  fulfillFetchSingleMuppet,
  rejectFetchSingleMuppet
} from '../actions/modalActions';

const styles = theme => ({

});

class MuppetsListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      muppetModalIsOpen: false,
    };
  }

  closeMuppetModal = () => {
    this.setState({
      muppetModalIsOpen: false
    })
  };

  openMuppetModal = () => {
    this.setState({
      muppetModalIsOpen: true
    })
  };

  handleMuppetChipClick = async (ID) => {

    // Open modal right away, loaders can tell user we are waiting
    this.openMuppetModal();

    // 1. Put state into loading/fetching mode
    this.props.dispatch(startFetchSingleMuppet());

    await this.props.client.query({
      query: SINGLE_MUPPET_QUERY,
      variables: {
        id: ID
      }
    }).then((res) => {
      // 2. store muppet data in redux on success
      this.props.dispatch(fulfillFetchSingleMuppet(res.data.getSingleMuppet[0]))
    }).catch((err) => {
      // 2. store error data in redux on fail
      this.props.dispatch(rejectFetchSingleMuppet(err))
    });

  };

  render() {

    const {classes, allMuppetsQuery: {loading, readMuppets}} = this.props;
    console.log('MuppetsListContainerProps:', this.props);

    if(loading) {
      return <Loader loadingText={"Loading Muppet Chips"} size={40} fontSize={22}/>
    }

    return (
      <div>

        <MuppetChip
          onClick={()=> this.handleMuppetChipClick("Please error")}
          label={"Error Chip"}
          imgSrc={"error"}
        />

        {readMuppets.edges && readMuppets.edges.map((edge, index) => (
          <MuppetChip
            key={index}
            onClick={()=> this.handleMuppetChipClick(edge.node.ID)}
            label={edge.node.Title}
            imgSrc={edge.node.ChipImage}
          />
        ))}
        <MuppetModal closeModal={() => this.closeMuppetModal()} isOpen={this.state.muppetModalIsOpen} muppetData={this.props.muppetModal}  />
      </div>
    )
  }

}

const SINGLE_MUPPET_QUERY = gql`
  query singleMuppet($id: ID!) {
  getSingleMuppet(ID:$id) {
    ID
    Title
    Description
    Thumbnail
  }
}
`;

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

const reduxWrapper = connect(
  state => ({
    muppetModal: state.muppetModal,
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  graphql(ALL_MUPPETS_QUERY,{name: 'allMuppetsQuery'}),
  withStyles(styles)
)(MuppetsListContainer);
