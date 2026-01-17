// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />

// Only necessary if you have an import from `$env/static/public`
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { build, files, version } from '$service-worker';

// This gives `self` the correct types
const self = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (globalThis.self));

const CACHE = `cache-${version}`;
const ASSETS = [
	...build,
	...files, // everything in `static`
];

const mod = {

	debugOn: false,
	
	precache: async () => (await caches.open(CACHE)).addAll(ASSETS),
	
	deleteCache: async () => Promise.all((await caches.keys()).filter(e => e !== CACHE).map(e => caches.delete(e))), // can't pass directly to map

	async respond (event) {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);
		let response;

		// always serve `build` and `files` from cache
		if (ASSETS.includes(url.pathname) && (response = await cache.match(url.pathname)))
			return response;

		// try network first, and fall back to cache if offline
		// (but if our whole app makes no requests this will probably never happen)
		try {
			response = await fetch(event.request);

			// sometimes fetch doesn't return a `Response`
			if (!(response instanceof Response))
				throw new Error('invalid response from fetch');

			if (response.status === 200)
				cache.put(event.request, response.clone());

			return response;
		} catch (err) {
			if (response = await cache.match(event.request))
				return response;

			// nothing more can do to respond to this request
			throw err;
		}
	},

	didInstall: event => event.waitUntil(mod.precache()),

	didActivate: event => event.waitUntil(mod.deleteCache()),

	didFetch: event => {
		// ignore POST requests, etc…
		if (event.request.method !== 'GET')
			return;

		if (event.request.url.match('service-worker.js'))
			return;

		const url = new URL(event.request.url);
		
		// storage account requests shouldn't be cached
		// not sure of the best way, but this is a guess
		if (event.request.mode === 'cors' && !ASSETS.includes(url.pathname))
			return mod.debugOn && console.log('skip cors', event.request.url);

		event.respondWith(mod.respond(event));
	},

	async message (event) {
		const signature = event.data;

		const api = {

			skipWaiting: () => self.skipWaiting(),

		};

		if (!Object.keys(api).includes(signature))
			return;

		await api[signature]()

		// return event.source.postMessage({
		// 	signature,
		// 	OLSKMessageArguments: event.data.OLSKMessageArguments,
		// 	OLSKMessageResponse: await api[signature](...[].concat(event.data.OLSKMessageArguments || [])),
		// });
	},

};

self.addEventListener('install', mod.didInstall);

self.addEventListener('activate', mod.didActivate);

self.addEventListener('fetch', mod.didFetch);

self.addEventListener('message', mod.message);
