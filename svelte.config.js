import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: '200.html', // may differ from host to host
			precompress: false,
			strict: true,
		}),
	},
	preprocess: [mdsvex({
		extensions: ['.sv.md']
	})],
	extensions: ['.svelte', '.sv.md'],
};

export default config;
