import React, { useEffect, useState } from "react";

const CLIENT_ID = "4c698708393549a2b41491c4e40ecf38";
const REDIRECT_URI = "http://localhost:5173/callback"; // Adjust to your redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // On mount, check for token in URL hash (after redirect)
    const hash = window.location.hash;
    let tokenFromUrl = null;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      tokenFromUrl = params.get("access_token");
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
        window.history.pushState({}, document.title, "/"); // Clean URL
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("spotifyToken");
  };

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private`;

  return (
    <div className="spotify-widget p-4 bg-gray-800 text-white rounded shadow-md w-full max-w-md">
      {!token ? (
        <a
          href={loginUrl}
          className="block px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-center font-semibold"
        >
          Login with Spotify
        </a>
      ) : (
        <>
          <p className="mb-4">Logged in! Token: {token.substring(0, 20)}...</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
          {/* Here you can add Spotify Web Playback SDK integration */}
          <p className="mt-4 italic text-sm">
            Next: integrate Spotify Web Playback SDK to play music here.
          </p>
        </>
      )}
    </div>
  );
};

export default SpotifyWidget;
