import "vidstack/bundle";

const Player = () => {
  return (
    <media-player
      class="max-w-96"
      title="Sprite Fight"
      src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8"
    >
      <media-provider></media-provider>
      <media-plyr-layout></media-plyr-layout>
    </media-player>
  );
};

export default Player;
