import queryString from "query-string";
import CLIENT_ID from "./constants";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const generateAuthUrl = (redirectUri) => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "token",
    scope: "user-library-read playlist-modify-private playlist-modify-public",
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

const requestToApi = async (url, token, method = "GET", body = null) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body,
  });

  const data = await response.json();

  if (response.status >= 400) throw parseError(data);

  return data;
};

export const createPlaylist = async (token, userId, playlistName) => {
  const url = `${SPOTIFY_BASE_URL}/users/${userId}/playlists`;

  return requestToApi(
    url,
    token,
    "POST",
    JSON.stringify({ name: playlistName })
  );
};

export const addTracksToPlaylist = async (token, playlistId, trackUris) => {
  const url = `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`;

  return requestToApi(url, token, "POST", JSON.stringify({ uris: trackUris }));
};

const mapToTrackModel = (spotifyModel, key) => {
  return {
    trackUri: spotifyModel.uri,
    albumCover: spotifyModel.album.images[0].url,
    artist: spotifyModel.artists[0].name,
    album: spotifyModel.album.name,
    name: spotifyModel.name,
    duration: spotifyModel.duration_ms,
    hasError: false,
    id: key,
  };
};

const fetchTrack = async (token, track) => {
  const param = {
    q: `artist:${track.artist} track:${track.track}`,
    type: "track",
  };

  const url = `${SPOTIFY_BASE_URL}/search?${queryString.stringify(param)}`;

  try {
    const data = await requestToApi(url, token);

    if (data.tracks.items.length)
      return mapToTrackModel(data.tracks.items[0], param.q);
    return { message: "track not found", hasError: true, id: param.q };
  } catch (e) {
    return { message: e.message, hasError: true, id: param.q };
  }
};

export const fetchTracks = async (token, tracks) => {
  return Promise.all(tracks.map((track) => fetchTrack(token, track)));
};

const mapToUserModel = (spotifyModel) => {
  return {
    username: spotifyModel.display_name,
    id: spotifyModel.id,
    profileImage: spotifyModel.images.length ? spotifyModel.images[0].url : "",
    hasError: false,
  };
};

export const fetchUser = async (token) => {
  const url = `${SPOTIFY_BASE_URL}/me`;
  try {
    const data = await requestToApi(url, token);

    return mapToUserModel(data);
  } catch (e) {
    return { message: e.message, hasError: true };
  }
};
