import React from "react";
import { shallow } from "enzyme";

import SpotifyLoginButton from "../SpotifyLoginButton";
import { generateAuthUrl } from "../utils/spotify";

describe("tests for login button", () => {
  it("renders button", () => {
    const wrapper = shallow(<SpotifyLoginButton />);
    expect(wrapper.find("button").length).toBe(1);
  });

  it("redirects to spotify authentication page after click", () => {
    const url = "http://a.com";
    Object.defineProperty(window, "location", {
      value: { href: url },
    });

    const expectedUrl = generateAuthUrl(url);

    shallow(<SpotifyLoginButton />)
      .find("button")
      .simulate("click");

    expect(window.location.href).toBe(expectedUrl);
  });
});
