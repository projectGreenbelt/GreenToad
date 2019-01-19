import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from '../PostsList/PostsList';


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
    minwidth: 275
  },
  list : {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 500,
    minwidth: 275,
    height: 600
  }
});


function PaperSheet(props) {
  const { classes, } = props;

  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16} >
          <Grid item xs>
            <Typography variant="h5" component="h3">
                Current Location Updates:
            </Typography>
            <hr/>
            <Paper className={classes.list} elevation={20}>
              <List>
                <ListItem>

                </ListItem>
              </List>
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