import parseArtistsTracks from "../parser";

describe("parser tests", () => {
  it("should return an empty array", () =>
    expect(parseArtistsTracks("")).toEqual([]));

  it("should return array with size 1", () =>
    expect(parseArtistsTracks("a - b").length).toBe(1));

  it("should return an array containing artis A with track B", () =>
    expect(parseArtistsTracks("A - B")).toStrictEqual([
      { artists: "A", track: "B" },
    ]));

  it("should return an array of two elements", () =>
    expect(parseArtistsTracks("A - B\nC - D").length).toBe(2));

  it('should return an array of two objects: { artists: "A", track: "B" }, { artists: "C", track: "D" }', () =>
    expect(parseArtistsTracks("A - B\nC - D")).toStrictEqual([
      { artists: "A", track: "B" },
      { artists: "C", track: "D" },
    ]));

  it("should return an empty string for track if it is not presented", () =>
    expect(parseArtistsTracks("A - ")).toStrictEqual([
      {
        artists: "A",
        track: "",
      },
    ]));

  it("should skip empty lines", () =>
    expect(parseArtistsTracks("\n\n\nA - B\n\n\n")).toStrictEqual([
      { artists: "A", track: "B" },
    ]));
    
  it("should trim extra spaces between artist and track names", () =>
    expect(parseArtistsTracks("    A      -   B        ")).toStrictEqual([
      { artists: "A", track: "B" },
    ]));
});
