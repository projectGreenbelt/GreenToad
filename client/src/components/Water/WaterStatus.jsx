import React, { Component } from "react";

// import water from "../../utils/WaterAPI";
import axios from "axios";

class WaterStatus extends Component {
    state = { status: [] };

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
            response.data.value.timeSeries[1].values[0].value[0].value < 1
            ? this.setState({ status: "The Water level is Low. No Diving!" })
            : response.data.value.timeSeries[1].values[0].value[0].value > 1 &&
                response.data.value.timeSeries[1].values[0].value[0].value < 2.60
            ? this.setState({ status: "The water level is OK."} )
            : response.data.value.timeSeries[1].values[0].value[0].value > 2.60 &&
                response.data.value.timeSeries[1].values[0].value[0].value < 10
            ? this.setState({ status: "The water level is Great!" })
            : this.setState({ status: "No Data Available"}),
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
            response.data.value.timeSeries[1].values[0].value[0].value < 1
            ? this.setState({ status: "The Water level is Low. No Diving!" })
            : response.data.value.timeSeries[1].values[0].value[0].value > 1 &&
                response.data.value.timeSeries[1].values[0].value[0].value < 2.50
            ? this.setState({ status: "The water level is OK."} )
            : response.data.value.timeSeries[1].values[0].value[0].value > 2.50 &&
                response.data.value.timeSeries[1].values[0].value[0].value < 10
            ? this.setState({ status: "The Water level is Great!" })
            : this.setState({ status: "No Data Available"}),
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

export default WaterStatus;
