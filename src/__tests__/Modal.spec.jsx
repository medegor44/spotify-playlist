import React from "react";
import { shallow } from "enzyme";

import Modal from "../Modal";
import SpotifyLoginButton from "../SpotifyLoginButton";

describe("tests for Modal", () => {
  it("renders modal display-block when prop is true", () => {
    const wrapper = shallow(<Modal show />);

    expect(wrapper.find(".modal").hasClass("display-block")).toBe(true);
  });

  it("renders modal display-none when prop is false", () => {
    const wrapper = shallow(<Modal show={false} />);

    expect(wrapper.find(".modal").hasClass("display-none")).toBe(true);
  });

  it("renders section with class modal-main", () => {
    const wrapper = shallow(<Modal show />);

    expect(wrapper.find("section").hasClass("modal-main")).toBe(true);
  });

  it("renders section inside .modal", () => {
    const wrapper = shallow(<Modal />);

    expect(wrapper.find(".modal").find("section").length).toBe(1);
  });

  it("renders login button inside modal and section", () => {
    const wrapper = shallow(<Modal />);

    expect(
      wrapper.find(".modal").find("section").find(SpotifyLoginButton).length
    ).toBe(1);
  });

  it("renders only one login button", () => {
    const wrapper = shallow(<Modal show />);

    expect(wrapper.find(SpotifyLoginButton).length).toBe(1);
  });
});
