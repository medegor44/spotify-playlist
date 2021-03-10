import axios from "axios";
import { fetchUser } from "../spotify";
import RetriesCountExceededError from "../RetriesCountExceededError";

jest.mock("axios");

describe("Tests for fetchUser", () => {
  it("should fetch user data", () => {
    const user = {
      display_name: "A",
      id: "123",
      images: [{ url: "a.com" }],
    };

    const expected = {
      username: "A",
      id: "123",
      profileImage: "a.com",
      hasError: false,
    };

    const resp = { data: user, status: 200 };

    axios.mockResolvedValue(resp);

    return fetchUser("token").then((data) => expect(data).toEqual(expected));
  });

  it("should retry request", async () => {
    const user = {
      display_name: "A",
      id: "123",
      images: [{ url: "a.com" }],
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
    const response200 = { data: user, status: 200 };

    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error500)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response200)));

    const actual = await fetchUser("token");

    expect(actual).toEqual(expected);
    expect(axios.mock.calls.length).toBe(2);
  }, 1500);

  it("should retry request after specified time in retry-after header", async () => {
    const user = {
      display_name: "A",
      id: "123",
      images: [{ url: "a.com" }],
    };

    const expected = {
      username: "A",
      id: "123",
      profileImage: "a.com",
      hasError: false,
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
    const response200 = { data: user, status: 200 };

    axios
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(error429)))
      .mockReturnValueOnce(new Promise((resolve) => resolve(response200)));

    const actual = await fetchUser("token");

    expect(actual).toEqual(expected);
    expect(axios.mock.calls.length).toBe(2);
  }, 2500);

  it("should throw RetriesCountExceededError when too much retries", async () => {
    const error500 = {
      response: {
        data: { message: "internal server error" },
        status: 500,
      },
    };

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

describe("", () => {});
