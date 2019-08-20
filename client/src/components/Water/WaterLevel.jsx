import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import LiquidFillGauge from "react-liquid-gauge";
// import water from "../../utils/WaterAPI";
import axios from "axios";

class WaterLevel extends Component {
  state = { value: 0.0 };
  startColor = "#1976d2"; // cornflowerblue
  endColor = "#2979ff"; // crimson

  componentWillReceiveProps = async (newProps) => {
    const response = await axios.get("https://waterservices.usgs.gov/nwis/iv/", {
      params: {
        site: newProps.location,
        format: "json",
        parameterCd: "00065,00060",
        siteStatus: "active"
      }
    })

    this.setState({
      value: response.data.value.timeSeries[1].values[0].value[0].value * 10
    })   
  }

  componentWillMount = async () => {
    const response = await axios.get("https://waterservices.usgs.gov/nwis/iv/", {
      params: {
        site: this.props.location,
        format: "json",
        parameterCd: "00065,00060",
        siteStatus: "active"
      }
    })
      
    this.setState({
      value: response.data.value.timeSeries[1].values[0].value[0].value * 10
    })
  }

  render() {
    /* const radius = 200; */
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(this.state.value / 100);
    
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
