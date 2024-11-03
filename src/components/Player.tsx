import {
  createResource,
  Switch,
  Match,
  Suspense,
  type Component,
  Show,
  createEffect,
} from "solid-js";
import HLS from "hls.js";

interface StreamResponse {
  url: string;
}

const fetchStream = async (id: string): Promise<StreamResponse> => {
  const response = await fetch(`http://localhost:8008/stream/${id}`);
  return response.json();
};

const VideoPlayer: Component<{ id: string }> = (props) => {
  const [stream] = createResource(props.id, fetchStream);

  let video!: HTMLVideoElement;

  createEffect(() => {
    if (stream()) {
      const hls = new HLS();
      hls.loadSource(stream()!.url);
      hls.attachMedia(video);
    }
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={stream.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={stream.error}>
          <span>Error: {stream.error}</span>
        </Match>
        <Match when={stream()}>
          <video ref={video} class="h-200" controls></video>
        </Match>
      </Switch>
    </Suspense>
  );
};

export default VideoPlayer;
