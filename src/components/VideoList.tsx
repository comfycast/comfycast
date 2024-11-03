import ky from "ky";
import { createResource, type Component, For } from "solid-js";

interface Video {
  name: string;
  id: string;
}

const fetchVideos = async (): Promise<Video[]> =>
  ky(`http://localhost:8008/videos`).json();

const VideoList: Component = () => {
  const [videos] = createResource(fetchVideos);

  return (
    <div class="flex flex-col p-5">
      <For each={videos()} fallback={<div>Loading...</div>}>
        {(video) => (
          <button class="border-1 m-1 h-20 border border-black shadow-sm">
            {video.name}
          </button>
        )}
      </For>
    </div>
  );
};

export default VideoList;
