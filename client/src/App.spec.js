import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

configure({ adapter: new Adapter() });
it("should render the Container Component", () => {
  const wrapper = shallow(<App auth={{ isAuthenticated: () => true }} 
    state = {{
    anchorEl: null,
    toProfile: false
  } }/>);
  console.log(wrapper.find("[data-name]").children());
  expect(wrapper.find("[data-name]")).toEqual(1);
});