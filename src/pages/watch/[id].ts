import type { APIRoute } from "astro";
import ky from "ky";

interface StreamResponse {
  id: string;
}

export const GET: APIRoute = async ({ params, redirect }) => {
  const { id } = params;

  const stream: StreamResponse = await ky(
    `http://localhost:8008/stream/create/${id}`,
  ).json();

  return redirect(`/stream/${stream.id}`);
};
