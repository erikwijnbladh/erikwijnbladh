<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let currentTrack = null;
  let loading = true;
  let error = false;
  let mounted = false;

  async function fetchNowPlaying() {
    try {
      loading = true;
      const response = await fetch("/api/spotify");
      const data = await response.json();

      if (data.error) {
        error = true;
        console.error("Error from Spotify API:", data.error);
      } else {
        currentTrack = data;
        error = false;
      }
    } catch (err) {
      console.error("Error fetching currently playing track:", err);
      error = true;
    } finally {
      loading = false;
    }
  }

  // Refresh data on component mount
  onMount(() => {
    fetchNowPlaying();
    mounted = true;

    // Refresh every 15 seconds
    const interval = setInterval(fetchNowPlaying, 5000);

    return () => clearInterval(interval);
  });
</script>

<div class="now-playing">
  {#if loading && !mounted}
    <span class="spotify-status">Connecting to Spotify...</span>
  {:else if error}
    <span class="spotify-status">Not connected to Spotify</span>
  {:else if currentTrack && currentTrack.isPlaying}
    <div class="track" in:fade={{ duration: 300 }}>
      <div class="track-info">
        <div class="playing-on-spotify">
          <span>Now playing on Spotify</span>
          <div class="live-indicator"></div>
        </div>
        <a
          href={currentTrack.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="track-title"
        >
          {currentTrack.title}
        </a>
        <span class="track-artist">{currentTrack.artist}</span>
      </div>
      {#if currentTrack.albumArt}
        <img
          class="album-art"
          src={currentTrack.albumArt}
          alt={currentTrack.album}
          in:fade={{ duration: 200 }}
        />
      {/if}
    </div>
  {:else}
    <span class="spotify-status">Not playing on Spotify</span>
  {/if}
</div>

<style>
  .now-playing {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    font-family: inherit;
    margin: 6px 0;
    text-align: right;
  }

  .track {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row;
  }

  .album-art {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    object-fit: cover;
  }

  .track-info {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .playing-on-spotify {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    font-size: 10px;
    opacity: 0.6;
    margin-bottom: 2px;
  }

  .live-indicator {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #1db954;
  }

  .track-title {
    font-size: 13px;
    font-weight: 500;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
  }

  .track-title:hover {
    text-decoration: underline;
  }

  .track-artist {
    font-size: 11px;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
  }

  .spotify-status {
    font-size: 13px;
    opacity: 0.7;
    text-align: right;
  }

  @media (max-width: 767px) {
    .track-title,
    .spotify-status {
      max-width: 180px;
    }
    .track-artist {
      max-width: 180px;
    }
  }
</style>
