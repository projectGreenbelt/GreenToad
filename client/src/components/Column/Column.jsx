import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Weather from '../Weather/Weather';
import WaterFlow from '../Water/WaterFlow';
import WaterLevel from '../Water/WaterLevel';
import '../../App.css'

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
    maxWidth: 600,
    minwidth: 295
  }
});


function PaperSheet(props) {
  const { classes, accessPoint } = props;
  
  return (
    <div>

      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16} >
          <Grid item xs>
            <Typography variant="h5" component="h3">
                Current Status:
            </Typography>
            <hr/>
            <Typography variant="h6" component="h3">
                Weather:
            </Typography>
            <div className="Widget">
              <Paper elevation={20}>
                <Weather />
              </Paper>
            </div>
            <br /><br />
            <div className="WaterStats">
              <Typography variant="h6" component="h3">
                  Water Level:
              </Typography>
              <Typography variant="h6" component="h3">
                  Water Flow:
              </Typography>
            </div>
            <div className="Widget" >
              <Paper className="Water" elevation={20}>
                <WaterLevel location={accessPoint.location} />
                <WaterFlow location={accessPoint.location} />
              </Paper> 
            </div>
            <br /><br />
            <Typography variant="h6" component="h3">
              Trails:
            </Typography>
            <div className="Widget">
              <Paper elevation={20}>
                <div 
                  className="TrailforksTrailList" 
                  data-w="295px" 
                  data-h="400px" 
                  data-rid="13781" 
                  data-displaytype="table" 
                >
                </div>
              </Paper>
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