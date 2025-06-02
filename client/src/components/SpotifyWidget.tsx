import React, { useState, useEffect } from 'react';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38';
const REDIRECT_URI = 'https://devdash-two.vercel.app/';
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
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
      <div className="flex flex-col items-center justify-center p-6">
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
          )}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Login with Spotify
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🎵 Spotify Search</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search songs or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={searchSpotify}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {results.map((track) => (
          <div
            key={track.id}
            className="flex items-center gap-4 bg-gray-800 p-3 rounded"
          >
            <img
              src={track.album.images[2]?.url}
              alt="album art"
              className="w-14 h-14 rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{track.name}</h3>
              <p className="text-gray-400 text-sm">
                {track.artists.map((a: any) => a.name).join(', ')}
              </p>
            </div>
            <button
              onClick={() => playTrack(track.uri)}
              className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
            >
              ▶️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyWidget;
