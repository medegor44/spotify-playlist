import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreatePlaylistForm from "../CreatePlaylistForm";
import UserContext from "../../../contexts/UserContext";
import useToken from "../../../hooks/useToken";
import {
  addTracksToPlaylist,
  createPlaylist,
} from "../../../spotify-client/spotify";
import UnauthorizedError from "../../../errors/UnauthorizedError";

jest.mock("../../../hooks/useToken");
jest.mock("../../../spotify-client/spotify");

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
  const responses = [
    {
      trackUri: "1",
      hasError: false,
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    useToken.mockImplementation(() => ["abc"]);
  });

  it("renders not disabled input for playlist name", () => {
    const providerProps = buildProviderProps();

    renderWithContext(
      <CreatePlaylistForm responses={responses} disabled={false} />,
      {
        providerProps,
      }
    );

    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });

  it("renders not disabled button", () => {
    const providerProps = buildProviderProps();

    renderWithContext(
      <CreatePlaylistForm responses={responses} disabled={false} />,
      {
        providerProps,
      }
    );

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("changes its text", () => {
    const providerProps = buildProviderProps();

    renderWithContext(
      <CreatePlaylistForm responses={responses} disabled={false} />,
      {
        providerProps,
      }
    );

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

    renderWithContext(
      <CreatePlaylistForm responses={responses} disabled={false} />,
      {
        providerProps,
      }
    );

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "playlist" },
      });
      fireEvent.click(screen.getByRole("button"));
    });

    await waitFor(async () => {
      expect(createPlaylist.mock.calls.length).toBe(1);
      expect(addTracksToPlaylist.mock.calls.length).toBe(1);
      expect(addTracksToPlaylist.mock.calls[0]).toEqual(["abc", 1111, ["1"]]);
    });
  });

  it("call onError from UserContext when UnauthorizedError thrown", async () => {
    const providerProps = buildProviderProps(jest.fn());

    createPlaylist.mockResolvedValue({ id: 1111 });
    addTracksToPlaylist.mockRejectedValue(new UnauthorizedError(""));

    renderWithContext(
      <CreatePlaylistForm responses={responses} disabled={false} />,
      {
        providerProps,
      }
    );

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
