import ky from "ky";
import { createResource, type Component, For } from "solid-js";

interface Video {
  id: string;
}

const fetchVideos = async (): Promise<Video[]> =>
  ky(`http://localhost:8008/videos`).json();

const VideoList: Component = () => {
  const [videos] = createResource(fetchVideos);

  return (
    <For each={videos()} fallback={<div>Loading...</div>}>
      {(video) => <div>{video.id}</div>}
    </For>
  );
};

export default VideoList;
