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

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="#121212" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,5 19,12 8,19" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="#121212" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="5" width="4" height="14" />
    <rect x="14" y="5" width="4" height="14" />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="#121212" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <polygon points="19,5 8,12 19,19" />
    <rect x="5" y="5" width="2" height="14" />
  </svg>
);

const SkipIcon = () => (
  <svg viewBox="0 0 24 24" fill="#121212" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5,5 16,12 5,19" />
    <rect x="17" y="5" width="2" height="14" />
  </svg>
);

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  // PKCE helpers
  const generateCodeVerifier = () => {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  };

  const generateCodeChallenge = async (verifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

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

    const res = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const data = await res.json();
    setToken(data.access_token);
    localStorage.setItem('spotify_token', data.access_token);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const savedToken = localStorage.getItem('spotify_token');
    if (savedToken) {
      setToken(savedToken);
    } else if (code) {
      exchangeToken(code);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const searchSpotify = async () => {
    if (!token || !query) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setResults(data.tracks.items);
  };

  const playTrack = async (trackUri: string, track?: SpotifyTrack) => {
    if (!token) return;
    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ uris: [trackUri] }),
    });
    setIsPlaying(true);
    if (track) setCurrentTrack(track);
  };

  const pauseTrack = async () => {
    if (!token) return;
    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsPlaying(false);
  };

  const nextTrack = async () => {
    if (!token) return;
    await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const previousTrack = async () => {
    if (!token) return;
    await fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  // Poll playback state every 5 seconds
  useEffect(() => {
    if (!token) return;

    const fetchPlaybackState = async () => {
      const res = await fetch('https://api.spotify.com/v1/me/player', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) return;
      if (res.ok) {
        const data = await res.json();
        setIsPlaying(data.is_playing);
        setCurrentTrack(data.item);
      }
    };

    fetchPlaybackState();
    const interval = setInterval(fetchPlaybackState, 5000);
    return () => clearInterval(interval);
  }, [token]);

  if (!token) {
    return (
      <div className="widget-container spotify-widget text-center">
        <button
          onClick={redirectToAuth}
          className="btn-modern bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-md interactive-scale focus-ring"
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#1db954" />
            <path d="M8 15s1.5-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 12s2-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 9s2.5-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Login with Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="widget-container spotify-widget p-0">
      <div className="p-4 pb-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#1db954" />
          <path d="M8 15s1.5-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 12s2-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 9s2.5-1 4-1 4 1 4 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">Spotify Player</span>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-modern mb-3 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />
        <button
          onClick={searchSpotify}
          className="btn-modern bg-slate-900 dark:bg-slate-800 text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 w-full mb-4"
        >
          Search
        </button>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-2 mb-4 max-h-56 overflow-y-auto scrollbar-thin">
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {results.map((track) => (
              <li
                key={track.id}
                className="flex items-center justify-between py-2 px-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition"
                title={`${track.name} — ${track.artists.map((a) => a.name).join(', ')}`}
              >
                <span className="truncate text-sm text-slate-800 dark:text-slate-100">
                  {track.name} — {track.artists.map((a) => a.name).join(', ')}
                </span>
                <button
                  onClick={() => playTrack(track.uri, track)}
                  className="btn-modern bg-emerald-500 hover:bg-emerald-600 text-white w-8 h-8 p-0 ml-2 rounded-full flex items-center justify-center"
                  aria-label={`Play ${track.name}`}
                >
                  <PlayIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 bg-slate-200 dark:bg-slate-900 rounded-xl p-3 mb-2">
          <button aria-label="Previous Track" className="btn-modern bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 w-10 h-10 rounded-full flex items-center justify-center" onClick={previousTrack}>
            <BackIcon />
          </button>
          {isPlaying ? (
            <button aria-label="Pause" className="btn-modern bg-emerald-500 hover:bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center" onClick={pauseTrack}>
              <PauseIcon />
            </button>
          ) : (
            <button
              aria-label="Play"
              className="btn-modern bg-emerald-500 hover:bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center"
              onClick={() => currentTrack && playTrack(currentTrack.uri, currentTrack)}
              disabled={!currentTrack}
            >
              <PlayIcon />
            </button>
          )}
          <button aria-label="Next Track" className="btn-modern bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 w-10 h-10 rounded-full flex items-center justify-center" onClick={nextTrack}>
            <SkipIcon />
          </button>
        </div>

        {currentTrack && (
          <div className="mt-3 text-center text-slate-900 dark:text-slate-100 font-semibold truncate" title={`${currentTrack.name} — ${currentTrack.artists.map((a) => a.name).join(', ')}`}>
            Now Playing: <span className="font-bold">{currentTrack.name}</span> — {currentTrack.artists.map((a) => a.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyWidget;