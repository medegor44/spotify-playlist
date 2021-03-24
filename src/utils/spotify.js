import queryString from "query-string";
import axios from "axios";
import CLIENT_ID from "./constants";
import UnauthorizedError from "./UnauthorizedError";
import RetriesCountExceededError from "./RetriesCountExceededError";

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

const getRandomInt = (maxValue) =>
  Math.floor(Math.random() * Math.floor(maxValue));

export const requestToApi = async (
  url,
  token,
  method = "GET",
  body = null,
  retries = 10,
  retryDelay = 1000
) => {
  if (retries === 0)
    throw new RetriesCountExceededError("Count of retries is exceeded");

  const retry = async (timeout, retriesCount = retries) => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            requestToApi(url, token, method, body, retriesCount, retryDelay)
          ),
        timeout
      );
    });
  };

  try {
    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });

    return response.data;
  } catch (e) {
    const { response } = e;

    const maxOfRandomDelay = 500;
    const randomDelayInMs = getRandomInt(maxOfRandomDelay);

    if (response.status >= 400) {
      if (response.status === 401)
        throw new UnauthorizedError("User is unauthorized");

      let timeoutInMs = retryDelay;
      if (response.status === 429)
        timeoutInMs =
          Number.parseInt(response.headers["retry-after"], 10) * 1000;

      return retry(timeoutInMs + randomDelayInMs, retries - 1);
    }
    return { ...parseError(response.data), hasError: true };
  }
};

export const createPlaylist = async (token, userId, playlistName) => {
  const url = `${SPOTIFY_BASE_URL}/users/${userId}/playlists`;

  return requestToApi(
    url,
    token,
    "POST",
    JSON.stringify({ name: playlistName, public: false })
  );
};

export const addTracksToPlaylist = async (token, playlistId, trackUris) => {
  const url = `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`;

  const limit = 100;
  const responses = [];
  const len = trackUris.length;

  for (let i = 0; i < len; i += limit) {
    const response = requestToApi(
      url,
      token,
      "POST",
      JSON.stringify({ uris: trackUris.slice(i, i + limit) })
    );

    responses.push(response);
  }

  return Promise.all(responses);
};

const mapToTrackModel = (spotifyModel) => {
  return {
    trackUri: spotifyModel.uri,
    albumCover: spotifyModel.album.images[0].url,
    artists: spotifyModel.artists.map((artist) => artist.name),
    album: spotifyModel.album.name,
    name: spotifyModel.name,
    duration: spotifyModel.duration_ms,
    hasError: false,
  };
};

const fetchTrack = async (token, track) => {
  const param = {
    q: `artist:${track.artists} track:${track.track}`,
    type: "track",
  };

  const url = `${SPOTIFY_BASE_URL}/search?${queryString.stringify(param)}`;
  try {
    const data = await requestToApi(url, token);

    if (data.tracks.items.length) return mapToTrackModel(data.tracks.items[0]);
    return {
      message: "track not found",
      hasError: true,
    };
  } catch (e) {
    return {
      message: "maybe rate limiter",
      hasError: true,
    };
  }
};

export const fetchTracks = async (token, tracks) => {
  const limit = 100;

  const wait = async (delayInMs) =>
    new Promise((r) => setTimeout(r, delayInMs));

  const responses = [];

  for (let i = 0; i < tracks.length; i += limit) {
    const batch = tracks.slice(i, i + limit);

    // eslint-disable-next-line no-await-in-loop
    const responsesForBatch = await Promise.all(
      batch.map((t) => fetchTrack(token, t))
    );

    responses.push(responsesForBatch);

    if (i + limit < tracks.lenght) {
      const maxOfRandomDelayInMs = 100;
      // eslint-disable-next-line no-await-in-loop
      await wait(getRandomInt(maxOfRandomDelayInMs));
    }
  }

  return responses.flat();
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
  const data = await requestToApi(url, token);

  return mapToUserModel(data);
};
