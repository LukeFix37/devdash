import React from 'react';

interface SpotifyEmbedProps {
  uri: string; // Spotify track, album, or playlist ID
  width?: number;
  height?: number;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  uri,
  width = 300,
  height = 80,
}) => {
  // You can embed track, album, or playlist by changing URL path below:
  // track: /embed/track/{id}
  // album: /embed/album/{id}
  // playlist: /embed/playlist/{id}

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${uri}`}
      width={width}
      height={height}
      frameBorder="0"
      allow="encrypted-media"
      allowTransparency={true}
      title="Spotify Player"
      style={{ borderRadius: 8 }}
    />
  );
};

export default SpotifyEmbed;
