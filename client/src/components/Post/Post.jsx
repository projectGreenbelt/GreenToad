import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

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
    padding: theme.spacing.unit * 2,
    paddingRight: 30,
    maxWidth: 600,
    minWidth: 275
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    maxWidth: 800,
    minWidth: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container wrap="nowrap" spacing={16}>
          <Grid item xs>
            <Typography variant="h6" component="h3">
              {/* <Paper elevation={20}> */}
              Add A Post
              {/* </Paper> */}
            </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Post Current Status Here!"
              multiline
              fullWidth
              rows="4"
              defaultValue=""
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="post"
              onChange={props.handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() => props.handleFormSubmit(props.event)}
            >
              Submit
            </Button>
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
