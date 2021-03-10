import axios from "axios";
import { fetchTracks } from "../spotify";

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
