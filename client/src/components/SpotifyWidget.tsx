import React, { useState, useEffect } from 'react';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38';
const REDIRECT_URI = 'https://devdash-two.vercel.app';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-private',
  'user-library-read',
  'streaming',
];

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get('access_token');
      if (_token) {
        setToken(_token);
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [token]);

  const searchSpotify = async () => {
    if (!token || !query) return;
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setResults(data.tracks.items);
  };

  const playTrack = async (trackUri: string) => {
    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ uris: [trackUri] }),
    });
  };

  if (!token) {
    return (
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join(
          '%20'
        )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
        className="btn btn-primary"
      >
        Login with Spotify
      </a>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchSpotify}>Search</button>
      <ul>
        {results.map((track) => (
          <li key={track.id}>
            {track.name} — {track.artists[0].name}
            <button onClick={() => playTrack(track.uri)}>▶️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyWidget;
