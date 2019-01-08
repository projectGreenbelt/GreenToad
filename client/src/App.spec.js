import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Authentication from "./components/Authentication/Authentication";

describe("App", () => {
  it("should render a <div />", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").length).toEqual(1);
  });
  it("should render the Authentication Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Authentication />)).toEqual(true);
  });
});
