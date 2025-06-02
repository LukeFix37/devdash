import React, { useEffect, useState } from 'react';

const CLIENT_ID = '4c698708393549a2b41491c4e40ecf38';
const REDIRECT_URI = 'https://devdash-2l0ca3xdh-lukefix37s-projects.vercel.app/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state'];

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<any>(null);

  useEffect(() => {
    // Parse token from URL hash
    const hash = window.location.hash;
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get('access_token');
      if (_token) {
        setToken(_token);
        window.history.replaceState(null, '', window.location.pathname); // clean URL
        localStorage.setItem('spotify_token', _token);
      }
    } else {
      const savedToken = localStorage.getItem('spotify_token');
      if (savedToken) setToken(savedToken);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 204 || response.status > 400) {
          setNowPlaying(null);
          return;
        }
        const data = await response.json();
        setNowPlaying(data);
      } catch {
        setNowPlaying(null);
      }
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const logout = () => {
    setToken(null);
    setNowPlaying(null);
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
    <div className="spotify-widget p-4 bg-gray-800 text-white rounded">
      {nowPlaying ? (
        <>
          <h3>Now Playing:</h3>
          <p>{nowPlaying.item.name} — {nowPlaying.item.artists.map((a: any) => a.name).join(', ')}</p>
          <img src={nowPlaying.item.album.images[0].url} alt="Album Art" style={{ width: 150 }} />
          <button onClick={logout} className="mt-2 btn btn-secondary">Logout</button>
        </>
      ) : (
        <>
          <p>No song currently playing.</p>
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </>
      )}
    </div>
  );
};

export default SpotifyWidget;
