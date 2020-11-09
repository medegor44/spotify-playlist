import queryString from "query-string";
import CLIENT_ID from "./constants";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const generateAuthUrl = (redirectUri) => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "token",
    scope: "user-library-read",
  };

  const queryStringParams = queryString.stringify(params);
  return `https://accounts.spotify.com/authorize?${queryStringParams}`;
};

export const getAccessTokenFromLocationHash = (locationHash) => {
  const parsed = queryString.parse(locationHash);
  return parsed["/access_token"];
};

const parseError = (data) => {
  if (data.error) return { message: data.error.message };
  return null;
};

const fetchSpotifyApiData = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.status >= 400) throw parseError(data);

  return data;
};

const mapToTrackModel = (spotifyModel, key) => {
  return {
    trackId: spotifyModel.id,
    albumCover: spotifyModel.album.images[0].url,
    artist: spotifyModel.artists[0].name,
    album: spotifyModel.album.name,
    name: spotifyModel.name,
    duration: spotifyModel.duration_ms,
    hasError: false,
    id: key,
  };
};

const fetchSpotifyTrackId = async (token, track) => {
  const param = {
    q: `artist:${track.artist} track:${track.track}`,
    type: "track",
  };

  const url = `${SPOTIFY_BASE_URL}/search?${queryString.stringify(param)}`;

  try {
    const data = await fetchSpotifyApiData(url, token);

    if (data.tracks.items.length)
      return mapToTrackModel(data.tracks.items[0], param.q);
    return { message: "track not found", hasError: true, id: param.q };
  } catch (e) {
    return { message: e.message, hasError: true, id: param.q };
  }
};

export const fetchSpotifyTracksIds = async (token, tracks) => {
  return Promise.all(tracks.map((track) => fetchSpotifyTrackId(token, track)));
};

const mapToUserModel = (spotifyModel) => {
  return {
    username: spotifyModel.display_name,
    profileImage: spotifyModel.images.length ? spotifyModel.images[0].url : "",
    hasError: false,
  };
};

export const fetchSpotifyUsername = async (token) => {
  const url = `${SPOTIFY_BASE_URL}/me`;
  try {
    const data = await fetchSpotifyApiData(url, token);

    return mapToUserModel(data);
  } catch (e) {
    return { message: e.message, hasError: true };
  }
};
