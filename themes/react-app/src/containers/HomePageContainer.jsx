import React, {Component} from 'react';
import {withApollo} from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import {gql, compose, graphql} from 'react-apollo';
import {fade} from 'material-ui/styles/colorManipulator';
import Typography from 'material-ui/Typography';
import Loader from '../components/Loader';
import RandomMuppetContainer from './RandomMuppetContainer';

const styles = theme => ({
  bannerImage: {
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'cover',
    'min-height': '300px',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'margin-bottom': '40px'
  },
  pageTitle: {
    fontSize: '68px',
    padding: '30px',
    'border-radius': '65px',
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    color: fade(theme.palette.common.white, 0.8),
  },
  introSection: {
    'padding': '0 30px 30px 30px',
    'max-width': '720px',
    'display': 'flex',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'text-align': 'left',
    'fontSize': '18px',
    'margin-bottom': '40px',
    'border-bottom': '1px solid lightgray'
  },
  bodySection: {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'padding': '0 30px',
    'align-items': 'center',
    'justify-content': 'space-evenly',
    marginBottom: '40px'
  },
  muppetCard: {
    // 'flex': '1',
    'margin-bottom': '40px'
  },
  contentText: {
    'flex': '1',
    'flex-basis': 'auto',
    'max-width': '500px',
    'box-sizing': 'border-box',
    'margin-bottom': '40px',
    fontSize: 'medium',
    'text-align': 'left'
  }
});

class HomePageContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('HomePage.jsx mounted with the following props: ', this.props)
  }

  render() {

    const {classes, data: {loading, getHomePageFirst}} = this.props;

    if (loading) {
      return <Loader loadingText={"Loading Home Page"} size={40} fontSize={22}/>;
    }

    const HomePageData = getHomePageFirst[0];
    const {Title, Intro, Content, BannerImage} = HomePageData;

    return (
      <div>
        <div className={classes.bannerImage} style={{backgroundImage: `url(${BannerImage})`}}>
          <div className={classes.pageTitle}>{Title}</div>
        </div>
        <Typography component="p" className={classes.introSection}>{Intro}</Typography>
        <div className={classes.bodySection}>
          <RandomMuppetContainer/>
          <Typography component="p" className={classes.contentText}
                      dangerouslySetInnerHTML={{__html: Content}}></Typography>
        </div>
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
