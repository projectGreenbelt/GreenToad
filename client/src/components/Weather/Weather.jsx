var React = require('react');
var Forecast = require('react-forecast');
 
var Weather = React.createClass({
  render: function() {
    return (
      <Forecast latitude={34.05} longitude={118.25} name='Los Angeles' />
    );
  }
});

export default Weather;