import { createResource, type Component, For } from "solid-js";

interface Video {
  id: string;
}

const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch(`http://localhost:8008/videos`);
  return response.json();
};

const VideoList: Component = () => {
  const [videos] = createResource(fetchVideos);

  return (
    <For each={videos()} fallback={<div>Loading...</div>}>
      {(video) => <div>{video.id}</div>}
    </For>
  );
};

export default VideoList;
