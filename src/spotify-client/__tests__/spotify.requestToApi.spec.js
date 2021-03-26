import axios from "axios";
import { requestToApi } from "../spotify";
import RetriesCountExceededError from "../../errors/RetriesCountExceededError";

jest.mock("axios");

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

    const startTime = Date.now();

    const actual = await requestToApi("url", "token", "GET", null, 10, 1000);

    const endTime = Date.now();

    expect(actual).toEqual(expected);
    expect(axios.mock.calls.length).toBe(2);
    expect(endTime - startTime).toBeLessThanOrEqual(2500);
  });

  it("should throw RetriesCountExceededError when too much retries", async () => {
    axios.mockRejectedValue(error500);

    const startTime = Date.now();
    try {
      await requestToApi("url", "token", "GET", null, 2, 10);
    } catch (e) {
      const endTime = Date.now();

      expect(e).toEqual(
        new RetriesCountExceededError("Count of retries is exceeded")
      );
      expect(endTime - startTime).toBeLessThanOrEqual(1020);
    }
  });
});
