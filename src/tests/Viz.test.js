import React from "react";
// import { render } from "@testing-library/react";

// Enzyme import
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Viz from "../pages/Viz";
import LoadingIcon from "../components/LoadingIcon";

configure({ adapter: new Adapter() });

describe("<Viz />", () => {
  it("Loading screen", () => {
    const wrapper = shallow(<Viz />);
    expect(wrapper.find(LoadingIcon)).toBeTruthy();
  });
});
