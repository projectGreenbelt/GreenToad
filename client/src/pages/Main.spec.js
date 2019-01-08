import React, { Component } from "react";
import Main from "../pages/Main";
import { shallow } from "enzyme";
import Nav from "../components/Nav/Nav";
import Card from "../components/Card/Card";
import Paper from "../components/Paper/Paper";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Map from "./Main";
import "../App.css";

describe("Main", () => {
  let wrapper;
  it("should render correctly", () => expect(wrapper).toMatchSnapshot());
  it("should render a <div />", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("div").length).toEqual(3);
  });
  it("Map should render Paper", () => {
    const wrapper = shallow(<Map />);
    expect(wrapper.containsMatchingElement(<Paper />)).toEqual(true);
  });
});
