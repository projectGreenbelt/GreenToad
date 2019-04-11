import React, { Component } from "react";
import { Redirect, Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "../Landing.css";
import "./../App.css";

//Material UI Icons for Menu
import AccountBalance from "@material-ui/icons/AccountBalance";
import Person from "@material-ui/icons/Person";
import Arrow from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -10,
    marginRight: 0
  },
  background: {
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    width: '95%',
    maxWidth: 550,
    minWidth: 150
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: 150,
    maxWidth: 600,
  }
});

class Landing extends Component {
    state = {
        anchorEl: null,
        toProfile: false
    };

    
    handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
    this.setState({ anchorEl: null });
    };

    handleProfile = () => {
    this.setState({ toProfile: true });
    };

    goTo(route) {
    this.props.history.replace(`/${route}`);
    }

    login() {
    this.props.auth.login();
    }

    logout() {
    this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { classes } = this.props;
        const { anchorEl } = this.state;
        
        
        if (this.state.toProfile === true) {
        return <Redirect to="/profile" />;
        }
        
        return (
            <div> 
               
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar className="theme">
                            <Typography variant="h5" color="inherit" className={classes.grow}>
                                GreenToad
                            </Typography>
                            <IconButton
                                className={styles.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                aria-owns={anchorEl ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                {isAuthenticated() && (
                                    <MenuItem
                                        onClick={this.handleClose}
                                        className={classes.menuItem}
                                    >
                                    <ListItemIcon className={classes.icon}>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.primary }}
                                        inset
                                        primary="Profile"
                                        onClick={() => this.handleProfile()}
                                    />
                                    </MenuItem>
                                )}
                                <Link to="/home" style={{ textDecoration: 'none', display: 'block' }} >
                                    <MenuItem
                                        onClick={this.handleClose}
                                        className={classes.menuItem}
                                    >
                                        <ListItemIcon className={classes.icon}>
                                            <AccountBalance />
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: classes.primary }}
                                            inset
                                            primary="Home"
                                        />
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="Background">
                    <Card className={classes.card} id="card">
                        <Typography className={classes.text} variant="h4">
                            Barton Creek Greenbelt
                        </Typography>
                        <hr />
                        <Typography className={classes.text} variant="body2">
                            One of Austin’s most prized attractions, the Barton Creek Greenbelt is filled
                            with thrilling biking trails, pristine swimming holes, and beautiful limestone 
                            bluffs that provide for excellent rock climbing. Unfortunately for newcomers, accessing 
                            this local treasure can be a little confusing. To help, here is a complete guide to all the public 
                            access points for Austin’s natural gem. Click CONTINUE to begin.  
                            <br/><br/>
                             *Don't forget you can also LOGIN and check out each location's updates from fellow Greenbelters 
                            or post your own statuses for others to see!*
                        </Typography>
                        <Link to="/home" style={{ textDecoration: 'none', display: 'block' }}>
                            <Button 
                                className={classes.button} 
                                color="primary" 
                                variant="contained" 
                                size="large"
                            >
                                <Arrow/>
                                Continue
                            </Button>
                        </Link>
                    </Card>
                </div>
                <div className="footer">
                    <div>
                        <List>
                        <ListItem>
                            <div>
                            &copy; {1900 + new Date().getYear()} ,{" "}
                                GreenToad
                            </div>
                            <IconButton
                            justicon="true"
                            color="primary"
                            >
                            <a 
                                href="https://github.com/projectGreenbelt/projectGreenbelt"
                                className="iconButton"
                            >
                                <i className="fab fa-github-square" id="icon" aria-hidden="true" color="secondary" />
                            </a>
                            </IconButton>
                        </ListItem>
                        </List>
                    </div>
                </div>                      
            </div>
        );
    }
}


export default withStyles(styles)(Landing);
