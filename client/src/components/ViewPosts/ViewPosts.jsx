import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Widget from '../Widget/Widget';
import Typography from '@material-ui/core/Typography';
import ViewPostsTitle from "../ViewPostsTitle/ViewPostsTitle";

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
    maxWidth: 400,
    minwidth: 275
  },
});


function PaperSheet(props) {
  const { classes, } = props;

  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16} >
          <Grid item xs>
            <ViewPostsTitle />
            <hr/>
            <Typography variant="h6" component="h3">
                User Post
            </Typography>
            <div className="Widget">
              <Paper elevation={20}>
                User Post
              </Paper>
            </div>
            <br /><br />
            <Typography variant="h6" component="h3">
                User Post
            </Typography>
            <div className="Widget">
              <Paper elevation={20}>
                User Post
              </Paper>
            </div>
            <br />
            <div className="Widget">
                <Widget />
            </div>
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