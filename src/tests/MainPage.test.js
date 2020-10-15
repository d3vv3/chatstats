import React from "react";
// import { render } from "@testing-library/react";

// Enzyme import
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainPage from "../pages/MainPage";
import FileInput from "../components/FileInput";

configure({ adapter: new Adapter() });

describe("<MainPage />", () => {
  it("Title", () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper.find("h1").text()).toContain("ChatStats!");
  });

  it("Input Button", () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper.find(FileInput)).toBeTruthy();
  });
});
