import React, { Component } from "react";

// import water from "../../utils/WaterAPI";
import axios from "axios";

class WaterFlowStatus extends Component {
  state = { status: [] };

  componentWillReceiveProps(newProps) {
    axios.get("https://waterservices.usgs.gov/nwis/iv/", {
      params: {
        site: newProps.location,
        format: "json",
        parameterCd: "00065,00060",
        siteStatus: "active"
      }
    })
    .then(response =>
      response.data.value.timeSeries[0].values[0].value[0].value < 20
      ? this.setState({ status: "The water is barely flowing." })
      : response.data.value.timeSeries[0].values[0].value[0].value > 20 &&
          response.data.value.timeSeries[0].values[0].value[0].value < 40
      ? this.setState({ status: "The water is flowing well."} )
      : response.data.value.timeSeries[0].values[0].value[0].value > 40 &&
          response.data.value.timeSeries[0].values[0].value[0].value < 100
      ? this.setState({ status: "The water is flowing fast!" })
      : this.setState({ status: "There is no water."}),
    )
    .catch();
  }

  componentWillMount() {
    axios.get("https://waterservices.usgs.gov/nwis/iv/", {
        params: {
        site: this.props.location,
        format: "json",
        parameterCd: "00065,00060",
        siteStatus: "active"
        }
    })
    .then(response =>
        response.data.value.timeSeries[1].values[0].value[0].value < 20
        ? this.setState({ status: "The water is barely flowing." })
        : response.data.value.timeSeries[1].values[0].value[0].value > 20 &&
            response.data.value.timeSeries[1].values[0].value[0].value < 40
        ? this.setState({ status: "The water is flowing pretty good."} )
        : response.data.value.timeSeries[1].values[0].value[0].value > 40  &&
            response.data.value.timeSeries[1].values[0].value[0].value < 100
        ? this.setState({ status: "The water is flowing fast!!" })
        : this.setState({ status: "There is no water!"}),
    )    
    .catch();
  }

  render() {
    const { status } = this.state
    
    return (
        <div>
            {status}
        </div>
    );
  }
}

export default WaterFlowStatus;