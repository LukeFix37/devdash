import React, { useState, useEffect } from 'react';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38'; // Make sure this matches exactly your Spotify app client ID
const REDIRECT_URI = 'https://devdash-two.vercel.app'; // Must exactly match your Spotify dashboard redirect URI
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

  // Parse token from URL hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get('access_token');
      if (_token) {
        setToken(_token);
        // Clean up URL
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [token]);

  // Construct Spotify authorization URL and log it for debugging
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

  console.log('Spotify Auth URL:', authUrl);

  // Search tracks on Spotify
  const searchSpotify = async () => {
    if (!token || !query.trim()) return;
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error('Spotify search failed:', text);
        return;
      }
      const data = await res.json();
      setResults(data.tracks.items);
    } catch (error) {
      console.error('Error fetching Spotify search:', error);
    }
  };

  // Play track using Spotify Web API
  const playTrack = async (trackUri: string) => {
    if (!token) return;
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to play track:', text);
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  if (!token) {
    return (
      <a href={authUrl} className="btn btn-primary">
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') searchSpotify();
        }}
      />
      <button onClick={searchSpotify}>Search</button>
      <ul>
        {results.map((track) => (
          <li key={track.id} style={{ marginBottom: '10px' }}>
            {track.name} — {track.artists[0].name}
            <button
              onClick={() => playTrack(track.uri)}
              style={{ marginLeft: '10px' }}
            >
              ▶️ Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyWidget;
