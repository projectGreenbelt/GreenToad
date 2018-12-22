import React, { Component } from "react";
import axios from "axios";
class Search extends Component {
  state = {
    search: "",
    result: []
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  apiSearch = event => {
    event.preventDefault();
    axios
      .get(`"querystring"${this.state.search}`)
      .then(res => this.setState({ result: res.data }));
  };
  render() {
    return (
      <div>
        <input
          name="search"
          value={this.state.search}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
export default Search;
