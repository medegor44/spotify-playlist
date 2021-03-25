import axios from "axios";
import { fetchUser } from "../spotify";

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user data", () => {
    axios.mockResolvedValue(response200);

    return fetchUser("token").then((data) => expect(data).toEqual(expected));
  });
});
