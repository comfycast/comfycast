import {
  createResource,
  Switch,
  Match,
  Suspense,
  type Component,
  Show,
} from "solid-js";

interface StreamResponse {
  url: string;
}

const fetchStream = async (id: string): Promise<StreamResponse> => {
  const response = await fetch(`http://localhost:8008/stream/${id}`);
  return response.json();
};

const Player: Component<{ id: string }> = (props) => {
  const [stream] = createResource(props.id, fetchStream);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={stream.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={stream.error}>
          <span>Error: {stream.error}</span>
        </Match>
        <Match when={stream()}>{stream()!.url}</Match>
      </Switch>
    </Suspense>
  );
};

export default Player;
