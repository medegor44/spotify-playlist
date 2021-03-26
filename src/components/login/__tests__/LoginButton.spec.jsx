import React from "react";
import { shallow } from "enzyme";

import LoginButton from "../LoginButton";
import { generateAuthUrl } from "../../../spotify-client";

describe("tests for login button", () => {
  it("renders button", () => {
    const wrapper = shallow(<LoginButton />);
    expect(wrapper.find("button").length).toBe(1);
  });

  it("redirects to spotify authentication page after click", () => {
    const url = "http://a.com";
    Object.defineProperty(window, "location", {
      value: { href: url },
    });

    const expectedUrl = generateAuthUrl(url);

    shallow(<LoginButton />)
      .find("button")
      .simulate("click");

    expect(window.location.href).toBe(expectedUrl);
  });
});
