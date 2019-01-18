import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
// import water from "../../utils/WaterAPI";
import axios from "axios";
// const water = require("../../utils/WaterAPI")

class Water extends Component {
    state = {
        value: 0
    };
    startColor = '#6495ed'; // cornflowerblue
    endColor = '#6495ed'; // crimson
 
    componentWillReceiveProps () {
        // water.runQuery(this.props.location)
          axios.get("https://waterservices.usgs.gov/nwis/iv/", {
            params: {
                site: this.props.location,
                format: "json",
                parameterCd: "00065,00060",
                siteStatus: "active"
            }
        }).then(response => this.setState({ value: response.data.value.timeSeries[0].values[0].value[0].value})).catch(console.log)  
    }
    render() {
        
        /* const radius = 200; */
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];
 
        return (
            <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={295}
                    height={295}
                    padding={295}
                    value={this.state.value}
                    percent="ft3/s"
                    textSize={.8}
                    textOffsetX={0}
                    textOffsetY={15}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };
 
                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={3}
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
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                    /* onClick={() => {
                        this.setState({ value: Math.random() * 100 });
                    }} */
                />
                
            </div>
        );
    }
}

export default Water;