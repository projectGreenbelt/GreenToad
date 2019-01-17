var React = require('react');

function Weather() {
  return (
      <div className="Weather" elevation={20}>
        <a
          class="weatherwidget-io" 
          href="https://forecast7.com/en/30d27n97d74/austin/?unit=us" 
          data-label_1="Barton Creek" 
          data-label_2="WEATHER" 
          data-font="Roboto" 
          data-icons="Climacons Animated" 
          data-days="3" 
          data-theme="weather_one" >Greenbelt Weather
        </a>
      </div> 
  );
}

export default Weather;