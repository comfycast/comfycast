import ky from "ky";
import { createResource, For, type Component } from "solid-js";
import { navigate } from "astro:transitions/client";

interface VideoButtonProps {
  name: string;
  id: string;
}

interface StreamResponse {
  id: string;
}

const VideoButton: Component<VideoButtonProps> = ({ name, id }) => {
  const handleClick = async () => {
    const res: StreamResponse = await ky(
      `http://localhost:8008/stream/create/${id}`,
    ).json();

    navigate(`/stream/${res.id}`);
  };

  return (
    <button
      onClick={handleClick}
      class="border-1 m-1 border border-black shadow-sm"
    >
      {name}
    </button>
  );
};

interface Video {
  name: string;
  id: string;
}

const VideoList = () => {
  const [videos] = createResource(() =>
    ky(`http://localhost:8008/videos`).json<Video[]>(),
  );

  return (
    <div class="flex flex-col">
      <For each={videos()} fallback={<div>Loading...</div>}>
        {(video) => <VideoButton {...video} />}
      </For>
    </div>
  );
};

export default VideoList;