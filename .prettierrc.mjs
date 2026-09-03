/** @type {import("prettier").Config} */
export default {
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'all',
	plugins: [
		'@prettier/plugin-oxc',
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss',
	],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
