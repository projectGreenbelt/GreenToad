import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import Card from './components/Card/Card';
import Paper from './components/Paper/Paper';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import './App.css';

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 30.256073, lng: -97.804777 }}
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
      <Marker position={{ lat: 30.264173, lng: -97.773195 }} className="trailhead" />
      <Marker position={{ lat: 30.257926, lng: -97.787518 }} spyglass />
      <Marker position={{ lat: 30.255326, lng: -97.783981 }} bartonHills />
      <Marker position={{ lat: 30.249326, lng: -97.795150 }} gusFruh />
      <Marker position={{ lat: 30.243766, lng: -97.800123 }} loop360 />
      <Marker position={{ lat: 30.244221, lng: -97.809666 }} twinFalls />
      <Marker position={{ lat: 30.275147, lng: -97.825273 }} trailsEnd />
    </GoogleMap>
  ))
);


class Main extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <div className="body">
        <Nav />
        <div className="Map">
          <Map
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
        <Paper />
        <div className="Card">
          <Card />
        </div>
        <Paper /> 
        <Paper />
        <Paper />
      </div>
    );
  }
}

export default Main