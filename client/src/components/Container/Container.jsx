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
import Modal from "@material-ui/core/Modal";
import Direction from "@material-ui/icons/Directions"
import "../../App.css";

//Material UI Icon
import CheckIn from "@material-ui/icons/CheckCircleOutline";

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
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  
});
function getModalStyle() {
  return {
    position: `absolute`,
    float: `center`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

function PaperSheet(props) {
  const { classes, accessPoint } = props;
  const { address, description, image, name, directions} = accessPoint;

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
              </div>
              <Paper className={classes.paper} elevation={20}>
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button} 
                  href={directions}
                >
                  <Direction className={classes.leftIcon}/>  Directions: {name}
                </Button>
              </Paper>
              <Paper className={classes.paper} elevation={20}>
                {name !== undefined ? (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={() => props.handleCheckIn()}
                      // onClick={() => props.handleLoading()}
                    >
                      <CheckIn className={classes.leftIcon} />
                      Check in at: {name}
                    </Button>

                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={props.checkedIn}
                    >
                      <div style={getModalStyle()} className={classes.modal} id="modal">
                        <Typography variant="h6" id="modal-title" color="primary">
                          Checking in at {name}...
                        </Typography>  
                        <SimpleModalWrapped />
                      </div>
                    </Modal>
                  </div>
                ) : (
                  ""
                )}
              </Paper>
            </div>
            <div>
              <Column accessPoint={accessPoint} />
              <br/>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};
const SimpleModalWrapped = withStyles(styles)(Modal);

export default withStyles(styles)(PaperSheet);
