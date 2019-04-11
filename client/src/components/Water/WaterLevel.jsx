import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import LiquidFillGauge from "react-liquid-gauge";
// import water from "../../utils/WaterAPI";
import axios from "axios";

class WaterLevel extends Component {
  state = {
    value: 0.0
  };
  startColor = "#1976d2"; // cornflowerblue
  endColor = "#2979ff"; // crimson

  componentWillReceiveProps(newProps) {
    // water.runQuery(this.props.location)
    axios
      .get("https://waterservices.usgs.gov/nwis/iv/", {
        params: {
          site: newProps.location,
          format: "json",
          parameterCd: "00065,00060",
          siteStatus: "active"
        }
      })
      .then(response =>
        this.setState({
          value: response.data.value.timeSeries[1].values[0].value[0].value * 10
        })
      )
      .catch();
  }

  componentWillMount() {
    axios
    .get("https://waterservices.usgs.gov/nwis/iv/", {
      params: {
        site: this.props.location,
        format: "json",
        parameterCd: "00065,00060",
        siteStatus: "active"
      }
    })
    .then(response =>
      this.setState({
        value: response.data.value.timeSeries[1].values[0].value[0].value * 10
      }),
    )
    .catch();
  }

  render() {
    /* const radius = 200; */
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(this.state.value / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor)
          .darker(0.5)
          .toString(),
        stopOpacity: 1,
        offset: "0%"
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%"
      },
      {
        key: "100%",
        stopColor: color(fillColor)
          .brighter(0.5)
          .toString(),
        stopOpacity: 0.5,
        offset: "100%"
      }
    ];

    return (
      <div>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={147.5}
          height={147.5}
          value={this.state.value}
          percent={"ft"}
          textSize={0.8}
          textOffsetX={0}
          textOffsetY={15}
          textRenderer={props => {
            const value = Math.round(props.value);
            const radius = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * radius) / 2;
            const valueStyle = {
              fontSize: textPixels
            };
            const percentStyle = {
              fontSize: textPixels * 0.6
            };

            return (
              <tspan>
                <tspan className="customValue" style={valueStyle}>
                  {value / 10}
                </tspan>
                <tspan style={percentStyle}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={2}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: fillColor
          }}
          waveStyle={{
            fill: fillColor
          }}
          textStyle={{
            fill: color("#444").toString(),
            fontFamily: "Arial"
          }}
          waveTextStyle={{
            fill: color("#fff").toString(),
            fontFamily: "Arial"
          }}
        />
      </div>
    );
  }
}

export default WaterLevel;
