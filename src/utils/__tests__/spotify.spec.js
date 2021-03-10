import axios from "axios";
import { fetchTracks, fetchUser, requestToApi } from "../spotify";
import RetriesCountExceededError from "../RetriesCountExceededError";

jest.mock("axios");

describe("Tests for fetchUser", () => {
  const response200 = {
    data: {
      display_name: "A",
      id: "123",
      images: [{ url: "a.com" }],
    },
    status: 200,
  };
  const expected = {
    username: "A",
    id: "123",
    profileImage: "a.com",
    hasError: false,
  };
  const error500 = {
    response: {
      data: { message: "internal server error" },
      status: 500,
    },
  };
  const error429 = {
    response: {
      data: { message: "Rate limiting" },
      status: 429,
      headers: {
        "retry-after": 2,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user data", () => {
    axios.mockResolvedValue(response200);

    return fetchUser("token").then((data) => expect(data).toEqual(expected));
  });

  it("should retry request", async () => {
    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error500)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response200)));

    const actual = await fetchUser("token");

    expect(actual).toEqual(expected);
    expect(axios.mock.calls.length).toBe(2);
  }, 1500);

  it("should retry request after specified time in retry-after header", async () => {
    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error429)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response200)));

    const actual = await fetchUser("token");

    expect(actual).toEqual(expected);

    expect(axios.mock.calls.length).toBe(2);
  }, 2500);

  it("should throw RetriesCountExceededError when too much retries", async () => {
    axios.mockRejectedValue(error500);

    try {
      await fetchUser("token");
    } catch (e) {
      expect(e).toEqual(
        new RetriesCountExceededError("Count of retries is exceeded")
      );
    }
  }, 15000);
});

describe("tests for requestToApi", () => {
  const response = {
    data: "ok",
    status: 200,
  };
  const error500 = {
    response: {
      data: { message: "internal server error" },
      status: 500,
    },
  };
  const error429 = {
    response: {
      data: { message: "Rate limiting" },
      status: 429,
      headers: {
        "retry-after": 2,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data", async () => {
    axios.mockResolvedValue(response);

    const actual = await requestToApi("url", "token");

    const expected = response.data;
    expect(actual).toBe(expected);
  });

  it("should retry request", async () => {
    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error500)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response)));
    const expected = response.data;

    const actual = await requestToApi("url", "token");

    expect(actual).toBe(expected);
    expect(axios.mock.calls.length).toBe(2);
  });

  it("should retry request after specified time in retry-after header", async () => {
    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error429)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response)));

    const expected = response.data;

    const actual = await requestToApi("url", "token");

    expect(actual).toEqual(expected);
    expect(axios.mock.calls.length).toBe(2);
  }, 2500);

  it("should throw RetriesCountExceededError when too much retries", async () => {
    axios.mockRejectedValue(error500);

    try {
      await requestToApi("url", "token");
    } catch (e) {
      expect(e).toEqual(
        new RetriesCountExceededError("Count of retries is exceeded")
      );
    }
  }, 15000);
});

describe("tests for fetchTracks", () => {
  const track = {
    artist: "A",
    track: "B",
  };
  const data = {
    tracks: {
      items: [
        {
          uri: "123",
          name: "B",
          duration_ms: 1234,
          album: {
            images: [{ url: "a.com" }],
            name: "C",
          },
          artists: [{ name: "A" }],
        },
      ],
    },
  };
  const expected = {
    trackUri: "123",
    albumCover: "a.com",
    artists: ["A"],
    album: "C",
    name: "B",
    duration: 1234,
    hasError: false,
  };

  it("should fetch one track", async () => {
    axios.mockResolvedValue({ data, status: 200 });

    const actual = await fetchTracks("token", [track]);

    expect(actual.length).toBe(1);
    expect(actual[0]).toEqual(expected);
  });

  it("should fetch all tracks from array", async () => {
    axios.mockResolvedValue({ data, status: 200 });

    const size = 1000;
    const tracks = [];
    const expectedArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < size; i++) {
      tracks.push(track);
      expectedArray.push(expected);
    }

    const actual = await fetchTracks("token", tracks);

    expect(actual).toEqual(expectedArray);
    expect(actual.length).toEqual(size);
  });
});
