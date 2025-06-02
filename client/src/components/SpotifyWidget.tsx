import React, { useState, useEffect } from "react";

const CLIENT_ID = "4c698708393549a2b41491c4e40ecf38";
const REDIRECT_URI = "https://devdash-two.vercel.app";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-private",
  "streaming",
];

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      if (_token) {
        setToken(_token);
        window.history.replaceState(null, "", window.location.pathname);
        localStorage.setItem("spotify_token", _token);
      }
    } else {
      const savedToken = localStorage.getItem("spotify_token");
      if (savedToken) setToken(savedToken);
    }
  }, [token]);

  const searchSpotify = async () => {
    if (!token || !query) return;
    setError(null);
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Spotify search failed");
      const data = await res.json();
      setResults(data.tracks.items);
    } catch {
      setError("Failed to search. Try again.");
    }
  };

  const playTrack = async (trackUri: string) => {
    if (!token) return;
    setError(null);
    try {
      const res = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ uris: [trackUri] }),
      });
      if (res.status === 204) {
        // success
      } else if (res.status === 404) {
        setError(
          "No active Spotify device found. Open Spotify on a device and try again."
        );
      } else {
        setError("Failed to start playback");
      }
    } catch {
      setError("Failed to start playback");
    }
  };

  const logout = () => {
    setToken(null);
    setResults([]);
    setQuery("");
    localStorage.removeItem("spotify_token");
    window.location.reload();
  };

  if (!token) {
    return (
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
        className="btn btn-primary"
      >
        Login with Spotify
      </a>
    );
  }

  return (
    <div>
      <button onClick={logout} style={{ marginBottom: 10 }}>
        Logout
      </button>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={searchSpotify}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((track) => (
          <li key={track.id} style={{ marginBottom: 8 }}>
            <img
              src={track.album.images[2]?.url}
              alt={track.name}
              width={50}
              height={50}
              style={{ verticalAlign: "middle", marginRight: 10 }}
            />
            {track.name} — {track.artists.map((a: any) => a.name).join(", ")}{" "}
            <button
              onClick={() => playTrack(track.uri)}
              style={{ marginLeft: 10 }}
            >
              ▶️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyWidget;
