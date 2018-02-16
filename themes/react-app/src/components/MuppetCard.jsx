import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

class MuppetCard extends Component {

  constructor(props) {
    super(props);

    this.state = {};

  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  onChange = ({target: {value}}) => {
    this.setState({value, copied: false});
  };

  onCopy = () => {
    this.setState({
      copied: true
    });
  };

  render() {

    const {classes, muppetData: {ID, Title, Description, Thumbnail}} = this.props;

    console.log(this.props);

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={Thumbnail}
          title={Title}
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            {Title}
          </Typography>
          <Typography component="p">
            {Description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}


export default withStyles(styles)(MuppetCard);