import React, { useEffect, useState } from 'react';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:3000'; // change to your app url
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-private',
  'user-library-read',
  'streaming',
];

function base64UrlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
}

function generateCodeVerifier() {
  const array = new Uint32Array(56/2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // After redirect back from Spotify, URL has ?code=... 
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const storedVerifier = localStorage.getItem('pkce_code_verifier');

    if (code && storedVerifier && !token) {
      // Send to backend for token exchange
      fetch('/api/spotify/token', { // YOUR backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, code_verifier: storedVerifier, redirect_uri: REDIRECT_URI }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            setToken(data.access_token);
            localStorage.setItem('spotify_access_token', data.access_token);
            window.history.replaceState(null, '', window.location.pathname); // clean url
          }
        });
    } else {
      const savedToken = localStorage.getItem('spotify_access_token');
      if (savedToken) setToken(savedToken);
    }
  }, [token]);

  const login = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

    localStorage.setItem('pkce_code_verifier', codeVerifier);

    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES.join(' '))}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
  };

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
    return <button onClick={login}>Login with Spotify</button>;
  }

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search songs..." />
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
