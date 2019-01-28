import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { Facebook, GithubCircle, Email } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: '10px',
  },
  cardContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatarHolder: {
    width: '100%',
    margin: 10,
  },
  bigAvatar: {
    margin: '0 auto',
    width: 100,
    height: 100,
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  socialIcon: {
    color: grey[700],
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: grey[800],
    },
  },
});

class MemberViewCard extends Component {
  renderData() {
    const { classes, memberData, isLoading } = this.props;
    if (isLoading !== false) {
      return 'Loading from MemberViewCard:34\n';
    }

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div>
            <div className={classes.avatarHolder}>
              <Avatar alt={memberData.Name} src={memberData['Picture URL']} className={classes.bigAvatar} />
            </div>
            <Typography variant="h5" component="h2">
              {memberData.Name}
            </Typography>
          </div>
          <Typography component="p">
            {memberData.Description}
          </Typography>
        </CardContent>
        <Chip
          label={memberData.Category}
          className={classes.chip}
          component="a"
          clickable
        />
        <CardActions>
          <div className={classes.social}>
            <a href={memberData['FB URL']} className={classes.socialIcon}><Facebook /></a>
            <a href={memberData['Github URL']} className={classes.socialIcon}><GithubCircle /></a>
            <a href={memberData['Primary Email Address']} className={classes.socialIcon}><Email /></a>
          </div>
        </CardActions>
      </Card>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.renderData()}
        </div>
      </React.Fragment>
    );
  }
}

MemberViewCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  memberData: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MemberViewCard);