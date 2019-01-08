import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("should render a <div />", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render the Authentic Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Authentication />)).toEqual(true);
  });
});
