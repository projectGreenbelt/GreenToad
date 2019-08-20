var React = require('react');

class Weather extends React.Component {
  state = {
    href: "https://forecast7.com/en/30d27n97d74/austin/?unit=us",
    dataLabel1: "Barton Creek",
    dataLabel2: "WEATHER",
    dataFont: "Roboto",
    dataIcons: "Climacons Animated",
    dataDays: "3",
    dataTheme: "weather_one"
  };

  render() {
    const { 
      href,
      dataLabel1,
      dataLabel2,
      dataFont,
      dataIcons,
      dataDays,
      dataTheme
    } = this.state;

    return (
      <div className="Weather">
        <a
          className="weatherwidget-io" 
          href={href}
          data-label_1={dataLabel1}
          data-label_2={dataLabel2} 
          data-font={dataFont} 
          data-icons={dataIcons}          
          data-days={dataDays} 
          data-theme={dataTheme}>
        </a>
      </div> 
    );
  }
}

export default Weather;