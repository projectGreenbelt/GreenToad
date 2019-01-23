import React, { Component } from "react";
import Main from "../pages/Main";
import { shallow } from "enzyme";
// import Nav from "../components/Nav/Nav";
// import Card from "../components/Card/Card";
// import Paper from "../components/Paper/Paper";
// import Container from "../pages/Main";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Map from "./Main";
import "../App.css";

// describe("Main", () => {
//   let wrapper;
//   it("should render correctly", () => expect(wrapper).toMatchSnapshot());
//   it("should render a <div />", () => {
//     const wrapper = shallow(<Main />);
//     expect(wrapper.find(Main).length).toEqual(1);
//   });
//   it("Map should render Paper", () => {
//     const wrapper = shallow(<Map />);
//     expect(wrapper.containsMatchingElement(<Paper />)).toEqual(true);
//   });
// });
describe("Main", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Main />)));

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });
});
// it("should render the Container Component", () => {
//   expect(wrapper.containsMatchingElement(<Container />)).toEqual(true);
// });

// describe("Map", () => {
//   beforeEach(() => (wrapper = shallow(<Map />)));
//   it("should render a <div />", () => {
//     const wrapper = shallow(<Map />);
//     expect(wrapper.find("div").length).toEqual(2);
//   });
// });
// it("should render the Container Component", () => {
//   const wrapper = shallow(<Map />);
//   expect(wrapper.containsMatchingElement(<Container />)).toEqual(true);
// });
