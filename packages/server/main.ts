import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello Elysia');

Deno.serve(app.fetch);
