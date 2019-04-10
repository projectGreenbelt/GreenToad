import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Container from "../components/Container/Container";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  BicyclingLayer,
  TrafficLayer
  /* InfoWindow */
} from "react-google-maps";
import "./../App.css";
import points from "../cards";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* import { CombineLatestSubscriber } from "rxjs/internal/observable/combineLatest"; */

const styles = theme => ({
  iconButtons: {
    marginRight: "3px !important",
    marginLeft: "3px !important",
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    marginTop: 30,
    maxWidth: 400,
  },
  text: {
    marginLeft: 20
  }
});

//Google Maps
const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12.8}
      defaultCenter={{ lat: 30.2591, lng: -97.801777 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "on" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker
        classname="marker"
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(1)}
        position={{ lat: 30.264143, lng: -97.773334 }}
        title="Trail Head"
        /* defaultLabel="Trail Head" */
      />
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(2)}
        position={{ lat: 30.257926, lng: -97.787518 }}
        title="Spyglass"
        /* defaultLabel="Spyglass" */
      />
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(3)}
        position={{ lat: 30.255326, lng: -97.783981 }}
        title="Barton Hills"
        /* defaultLabel="Barton Hills" */
      />
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(4)}
        position={{ lat: 30.249326, lng: -97.79515 }}
        title="Gus Fruh"
        /* defaultLabel="Gus Fruh" */
      />
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(5)}
        position={{ lat: 30.243766, lng: -97.800123 }}
        title="Loop 360"
        /* defaultLabel="Loop 360" */
      >
      </Marker>
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(6)}
        position={{ lat: 30.244221, lng: -97.809666 }}
        title="Gaines"
        /* defaultLabel="Gaines" */
      />
      <Marker
        icon={{
          url: "https://image.flaticon.com/icons/svg/1397/1397883.svg",
          scaledSize: { height: 50, width: 50 },
          fixedRotation: true
        }}
        onClick={() => props.handleMarkerClick(7)}
        position={{ lat: 30.275147, lng: -97.825273 }}
        title="Trail's End"
        /* defaultLabel="Trail's End" */
      />
      <BicyclingLayer autoUpdate />
      <TrafficLayer autoUpdate />
    </GoogleMap>
  )),
  function handleClick(e) {
    e.preventDefault();
  }
);

class Main extends Component {
  // Constructor and state
  state = {
    currentAccessPoint: null,
    checkInLocation: {},
    checkedIn: false,
    toPosts: false
  };

  // Lifecycle function
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    // console.log(points); removed this console log because it throws every time I run Jest test.
  }

  // Custom function
  handleMarkerClick = number => {
    let point = {};

    // Grab the proper access point from the json
    for (let i = 0; i < points.length; i++) {
      if (number === points[i].id) {
        point = points[i];
      }
    }

    // Setting access point information in the state
    this.setState({
      currentAccessPoint: point
    });
  };
  handleCheckIn = () => {
    // Setting access point information in the state
    this.setState({
      checkInLocation: this.state.currentAccessPoint,
      checkedIn: true
    });
    this.handleRedirect = setTimeout(() => {
      this.setState(() => ({ toPosts: true }));
    }, 1750);
  };

  // Render function
  render() {
    let location = `/social/${this.state.checkInLocation.id}`;
    if (this.state.toPosts === true) {
      return <Redirect to={location} />;
    }
    const { currentAccessPoint } = this.state;
    const { classes } = this.props;
    
    return (
      <div>
        <React.Fragment>
          {withStyles}
        </React.Fragment>
        <div className="Map">
          <Map
            handleMarkerClick={this.handleMarkerClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCh_URgHgmsx6M6uNR7BQ0J9udoszW9zIg"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `100%`,
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>

       {currentAccessPoint ?
        <Container
          accessPoint={currentAccessPoint}
          handleCheckIn={this.handleCheckIn}
          checkedIn={this.state.checkedIn}
        />  : 
        <Paper
          className={classes.paper}
          elevation={20}
          id="Card"
        > 
          <Typography className={classes.text} variant="body1" component="h3" color="primary">
            Click on any of the access points above for a detailed
            breakdown of that particular location!
          </Typography>
        </Paper>}
        <div className="footer">
          <div>
            <List>
              <ListItem>
                <div>
                  &copy; {1900 + new Date().getYear()} , GreenToad
                </div>
                <IconButton justicon="true" color="primary">
                  <a
                    href="https://github.com/projectGreenbelt/projectGreenbelt"
                    className="iconButton"
                  >
                    <i
                      className="fab fa-github-square"
                      id="icon"
                      aria-hidden="true"
                      color="secondary"
                    />
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

export default withStyles(styles)(Main);
