import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Description from "../Paper/Paper";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: "hidden"
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  }
});

function PaperSheet(props) {
  const { classes, accessPoint } = props;
  const { address, description, image, name, id } = accessPoint;

  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item xs className="container">
            <div className="col1">
              <Paper className={classes.paper} elevation={20}>
                <Typography variant="h4" component="h3">
                  {name}
                </Typography>
                <Typography variant="h6" component="h5">
                  {address}
                </Typography>
                <div className="Card">
                  <Card image={image} elevation={15} />
                </div>
              </Paper>
              <div className="Card">
                <Description description={description} />
                <Button
                  onClick={() => props.handleCheckIn()}
                  className="Button"
                  id={id}
                  onClick
                >
                  Check in at {name}
                </Button>
              </div>
            </div>
            <Column />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
