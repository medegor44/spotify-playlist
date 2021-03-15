import { setToken, clearToken, getToken } from "../tokenStorage";
import mockStorage from "../__mocks__/storage";

describe("tokenStorage tests", () => {
  beforeEach(() => {
    mockStorage("sessionStorage");
  });

  it("should save token", () => {
    setToken("abc");
    expect(getToken()).toBe("abc");
  });

  it("should get token after setting", () => {
    setToken("abc");
    setToken("def");

    expect(getToken()).toBe("def");
  });

  it("should return null if token is not saved", () => {
    expect(getToken()).toBe(null);
  });

  it("should clear token", () => {
    setToken("abc");
    clearToken();

    expect(getToken()).toBe(null);
  });
});
