import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [solidJs()],
	env: {
		schema: {
			API_URL: envField.string({
				context: 'client',
				access: 'public',
				default: 'http://localhost:8008',
			}),
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
