import React, { useState, useEffect } from 'react';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38';
const REDIRECT_URI = 'https://devdash-two.vercel.app/'; // make sure this EXACTLY matches your Spotify app redirect URI
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    console.log('URL hash:', hash);
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get('access_token');
      console.log('Parsed token:', _token);
      if (_token) {
        setToken(_token);
        localStorage.setItem('spotify_token', _token);
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      const savedToken = localStorage.getItem('spotify_token');
      console.log('Saved token from storage:', savedToken);
      if (savedToken) setToken(savedToken);
    }
  }, [token]);

  const searchSpotify = async () => {
    if (!token) {
      setError('You must be logged in to search.');
      return;
    }
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError(null);
    try {
      console.log(`Searching Spotify for: ${query}`);
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Search response status:', res.status);
      if (!res.ok) throw new Error('Spotify search failed');
      const data = await res.json();
      console.log('Search results:', data);
      setResults(data.tracks.items);
    } catch (e) {
      console.error(e);
      setError('Failed to search. Try again.');
    }
  };

  const playTrack = async (trackUri: string) => {
    if (!token) {
      setError('You must be logged in to play music.');
      return;
    }
    setError(null);
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });
      if (res.status === 204) {
        console.log('Playback started');
      } else {
        console.error('Playback failed:', res.status, await res.text());
        setError('Failed to play track. Make sure you have an active Spotify device.');
      }
    } catch (e) {
      console.error(e);
      setError('Failed to play track.');
    }
  };

  const logout = () => {
    setToken(null);
    setResults([]);
    setQuery('');
    setError(null);
    localStorage.removeItem('spotify_token');
  };

  if (!token) {
    return (
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
        className="btn btn-primary"
      >
        Login with Spotify
      </a>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <button onClick={logout} style={{ marginBottom: 10 }}>
        Logout
      </button>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '70%', marginRight: 5 }}
      />
      <button onClick={searchSpotify}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {results.map((track) => (
          <li key={track.id} style={{ marginBottom: 8 }}>
            {track.name} — {track.artists[0].name}{' '}
            <button onClick={() => playTrack(track.uri)} title="Play Track">
              ▶️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyWidget;
