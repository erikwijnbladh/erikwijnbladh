import { json } from "@sveltejs/kit";
import axios from "axios";
import { env } from "$env/dynamic/private";

// Spotify API configuration - these will be environment variables on the server
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

// Get access token using refresh token
const getAccessToken = async (clientId, clientSecret, refreshToken) => {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    return null;
  }
};

// Handle GET requests to /api/spotify
export async function GET({ fetch, platform }) {
  // Get environment variables - check different possible sources
  // Try SvelteKit's env first (local dev), then platform.env (Vercel)
  const clientId = env.SPOTIFY_CLIENT_ID || platform?.env?.SPOTIFY_CLIENT_ID;
  const clientSecret =
    env.SPOTIFY_CLIENT_SECRET || platform?.env?.SPOTIFY_CLIENT_SECRET;
  const refreshToken =
    env.SPOTIFY_REFRESH_TOKEN || platform?.env?.SPOTIFY_REFRESH_TOKEN;

  // Check if we have the required credentials
  if (!clientId || !clientSecret || !refreshToken) {
    return json(
      {
        error: "Spotify credentials not configured",
        envCheck: {
          hasClientId: !!clientId,
          hasClientSecret: !!clientSecret,
          hasRefreshToken: !!refreshToken,
        },
      },
      { status: 500 }
    );
  }

  try {
    // Get a new access token
    const accessToken = await getAccessToken(
      clientId,
      clientSecret,
      refreshToken
    );

    if (!accessToken) {
      return json({ error: "Failed to get access token" }, { status: 500 });
    }

    // Fetch currently playing track
    const response = await axios.get(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // If no track is playing
    if (response.status === 204 || response.status > 400) {
      return json({ isPlaying: false });
    }

    // Extract and format track data
    const song = response.data;
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((artist) => artist.name).join(", ");
    const album = song.item.album.name;
    const albumArt = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;

    // Return formatted track data
    return json({
      isPlaying,
      title,
      artist,
      album,
      albumArt,
      songUrl,
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);

    // If status is 204, user is not playing anything
    if (error.response?.status === 204) {
      return json({ isPlaying: false });
    }

    // Return error info
    return json(
      {
        error: "Failed to fetch Spotify data",
        message: error.message,
        isPlaying: false,
      },
      { status: 500 }
    );
  }
}
