import React, { useState, useEffect } from 'react';
import type { SpotifyTrack } from '../types';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38';
const REDIRECT_URI = 'https://devdash-two.vercel.app';
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-private',
  'streaming',
];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  // === PKCE & Auth Logic ===
  // Generate a random code verifier string
  const generateCodeVerifier = () => {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
  };

  // Generate code challenge from verifier (SHA256 base64-url encoded)
  const generateCodeChallenge = async (verifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64;
  };

  // Redirect to Spotify auth with PKCE
  const redirectToAuth = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('spotify_code_verifier', verifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      scope: SCOPES.join(' '),
    });

    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
  };

  // Exchange authorization code for access token
  const exchangeToken = async (code: string) => {
    const verifier = localStorage.getItem('spotify_code_verifier');
    if (!verifier) return;

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    });

    try {
      const res = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const data = await res.json();
      if (data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('spotify_token', data.access_token);
      }
    } catch (err) {
      console.error('Token exchange failed', err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const savedToken = localStorage.getItem('spotify_token');
    if (savedToken) {
      setToken(savedToken);
    } else if (code) {
      exchangeToken(code);
      // Clean URL (remove code param)
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // === Spotify API functions ===
  const searchSpotify = async () => {
    if (!token || !query) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setResults(data.tracks?.items || []);
  };

  const playTrack = async (trackUri: string, track?: SpotifyTrack) => {
    if (!token) return;
    try {
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ uris: [trackUri] }),
      });
      setIsPlaying(true);
      if (track) setCurrentTrack(track);
    } catch (err) {
      console.error('Play track error', err);
    }
  };

  const pauseTrack = async () => {
    if (!token) return;
    try {
      await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsPlaying(false);
    } catch (err) {
      console.error('Pause track error', err);
    }
  };

  const nextTrack = async () => {
    if (!token) return;
    try {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally refresh current track info here
    } catch (err) {
      console.error('Next track error', err);
    }
  };

  const previousTrack = async () => {
    if (!token) return;
    try {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally refresh current track info here
    } catch (err) {
      console.error('Previous track error', err);
    }
  };

  // Poll playback state every 5s to update UI
  useEffect(() => {
    if (!token) return;

    const fetchPlaybackState = async () => {
      try {
        const res = await fetch('https://api.spotify.com/v1/me/player', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 204) return; // nothing playing
        if (res.ok) {
          const data = await res.json();
          setIsPlaying(data.is_playing);
          setCurrentTrack(data.item);
        }
      } catch (err) {
        console.error('Fetch playback state error', err);
      }
    };

    fetchPlaybackState();
    const interval = setInterval(fetchPlaybackState, 5000);
    return () => clearInterval(interval);
  }, [token]);

  if (!token) {
    return (
      <button onClick={redirectToAuth} className="btn btn-primary">
        Login with Spotify
      </button>
    );
  }

  return (
    <div
      className="spotify-widget"
      style={{
        maxWidth: 480,
        margin: '0 auto',
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 8,
        backgroundColor: '#1db954',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: 4,
          border: 'none',
          marginBottom: 12,
          fontSize: 16,
        }}
      />
      <button
        onClick={searchSpotify}
        style={{
          width: '100%',
          padding: '10px 0',
          borderRadius: 4,
          border: 'none',
          backgroundColor: '#191414',
          color: '#1db954',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: 16,
        }}
      >
        Search
      </button>

      <div
        style={{
          maxHeight: 300,
          overflowY: 'auto',
          backgroundColor: '#121212',
          borderRadius: 6,
          padding: 8,
          boxShadow: '0 0 8px rgba(0,0,0,0.8)',
          marginBottom: 16,
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.length === 0 && (
            <li style={{ padding: 8, color: '#ccc', textAlign: 'center' }}>No results</li>
          )}
          {results.map((track) => (
            <li
              key={track.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderBottom: '1px solid #333',
                cursor: 'default',
              }}
              title={`${track.name} — ${track.artists.map((a) => a.name).join(', ')}`}
            >
              <span
                style={{
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {track.name} — {track.artists.map((a) => a.name).join(', ')}
              </span>
              <button
                onClick={() => playTrack(track.uri, track)}
                style={{
                  marginLeft: 12,
                  backgroundColor: '#1db954',
                  border: 'none',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  color: '#121212',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                aria-label={`Play ${track.name}`}
              >
                ▶️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Playback Controls */}
      <div
        style={{
          backgroundColor: '#191414',
          borderRadius: 6,
          padding: 12,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <button
          onClick={previousTrack}
          style={{
            backgroundColor: '#1db954',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            color: '#121212',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          aria-label="Previous Track"
        >
          ⏮️
        </button>

        {isPlaying ? (
          <button
            onClick={pauseTrack}
            style={{
              backgroundColor: '#1db954',
              border: 'none',
              borderRadius: '50%',
              width: 50,
              height: 50,
              color: '#121212',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            aria-label="Pause"
          >
            ⏸️
          </button>
        ) : (
          <button
            onClick={() => currentTrack && playTrack(currentTrack.uri, currentTrack)}
            style={{
              backgroundColor: '#1db954',
              border: 'none',
              borderRadius: '50%',
              width: 50,
              height: 50,
              color: '#121212',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            aria-label="Play"
            disabled={!currentTrack}
          >
            ▶️
          </button>
        )}

        <button
          onClick={nextTrack}
          style={{
            backgroundColor: '#1db954',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            color: '#121212',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          aria-label="Next Track"
        >
          ⏭️
        </button>
      </div>

      {/* Current Track Info */}
      {currentTrack && (
        <div
          style={{
            marginTop: 12,
            fontSize: 14,
            color: '#ccc',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={`${currentTrack.name} — ${currentTrack.artists.map((a) => a.name).join(', ')}`}
        >
          Now Playing: {currentTrack.name} — {currentTrack.artists.map((a) => a.name).join(', ')}
        </div>
      )}
    </div>
  );
};

export default SpotifyWidget;
