import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../../App.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: 'hidden',
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 300,
    minWidth: 275,
  },
  signin: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 300,
    minWidth: 275,
    backgroundColor: '#4caf50' 
  },
  iconButtons: {
    marginRight: "3px !important",
    marginLeft: "3px !important",
  },
  
});


function PaperSheet(props) {
  const { classes } = props;
  
  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16} >
          <Grid item xs>
            <Typography variant="h6" component="h3">
              Check In
            </Typography>
            <Paper 
              className={classes.signin} 
              elevation={20}
              classes={{ paper: classes.paper }}
            >
              <br /><br />
              <div className="IconButton">
                <IconButton
                  color="secondary"
                  justIcon
                  className={classes.iconButtons}
                  onClick={e => e.preventDefault()}
                >
                  <i className="fab fa-twitter-square" aria-hidden="false" />
                </IconButton>
                <IconButton
                  justIcon
                  color="secondary"
                  className={classes.iconButtons}
                  onClick={e => e.preventDefault()}
                >
                  <i className="fab fa-facebook-square" aria-hidden="true" color="secondary" />
                </IconButton>
                <IconButton
                  justIcon
                  color="secondary"
                  className={classes.iconButtons}
                  onClick={e => e.preventDefault()}
                >
                  <i className="fab fa-google-plus-square" aria-hidden="true" />
                </IconButton>
              </div>
              <br /><br />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);