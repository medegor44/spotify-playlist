import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreatePlaylistButton from "../CreatePlaylistButton";
import UserContext from "../contexts/UserContext";
import useToken from "../hooks/useToken";
import { addTracksToPlaylist, createPlaylist } from "../utils/spotify";
import UnauthorizedError from "../utils/UnauthorizedError";

jest.mock("../hooks/useToken");
jest.mock("../utils/spotify");

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

const buildProviderProps = (onError = () => {}) => {
  return {
    value: {
      userData: {
        id: 1,
      },
      onError,
    },
  };
};

describe("tests for CreatePlaylistButton component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useToken.mockImplementation(() => ["abc"]);
  });

  it("renders not disabled input for playlist name", () => {
    const providerProps = buildProviderProps();

    renderWithContext(<CreatePlaylistButton tracksUris={["1", "2", "3"]} />, {
      providerProps,
    });

    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });

  it("renders not disabled button", () => {
    const providerProps = buildProviderProps();

    renderWithContext(<CreatePlaylistButton tracksUris={["1", "2", "3"]} />, {
      providerProps,
    });

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("changes its text", () => {
    const providerProps = buildProviderProps();

    renderWithContext(<CreatePlaylistButton tracksUris={["1", "2", "3"]} />, {
      providerProps,
    });

    const expected = "playlist";

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: expected },
      });
    });

    expect(screen.getByRole("textbox").value).toBe(expected);
  });

  it("creates playlist and submits track uris to spotify", async () => {
    const providerProps = buildProviderProps();
    createPlaylist.mockResolvedValue({ id: 1111 });

    renderWithContext(<CreatePlaylistButton tracksUris={["1", "2", "3"]} />, {
      providerProps,
    });

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "playlist" },
      });
      fireEvent.click(screen.getByRole("button"));
    });

    await waitFor(async () => {
      expect(createPlaylist.mock.calls.length).toBe(1);
      expect(addTracksToPlaylist.mock.calls.length).toBe(1);
      expect(addTracksToPlaylist.mock.calls[0]).toEqual([
        "abc",
        1111,
        ["1", "2", "3"],
      ]);
    });
  });

  it("call onError from UserContext when UnauthorizedError thrown", async () => {
    const providerProps = buildProviderProps(jest.fn());

    createPlaylist.mockResolvedValue({ id: 1111 });
    addTracksToPlaylist.mockRejectedValue(new UnauthorizedError(""));

    renderWithContext(<CreatePlaylistButton tracksUris={["1", "2", "3"]} />, {
      providerProps,
    });

    act(() => {
      const expected = "playlist";
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: expected },
      });
      fireEvent.click(screen.getByRole("button"));
    });

    await waitFor(async () => {
      expect(createPlaylist.mock.calls.length).toBe(1);
      expect(addTracksToPlaylist.mock.calls.length).toBe(1);
      expect(providerProps.value.onError.mock.calls.length).toBe(1);
    });
  });
});
