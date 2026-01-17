<script>
const mod = {

	isVisible: false,
	debugOn: false,

	// control

	skipWaiting () {
		mod.nextWorker.postMessage('skipWaiting');
	},

	// message

	updatefound (event) {
		mod.debugOn && console.log('updatefound', event);

		mod.nextWorker = mod.registration.installing;

		mod.nextWorker.addEventListener('statechange', mod.statechange);
	},

	statechange (event) {
		mod.debugOn && console.log('statechange', mod.nextWorker.state, event, navigator.serviceWorker.controller);

		if (mod.nextWorker.state !== 'installed')
			return;

		if (!navigator.serviceWorker.controller)
			return;

		mod.isVisible = true;
	},

	controllerchange (event) {
		mod.debugOn && console.log('controllerchange', event);

		window.location.reload();
	},

	// lifecycle

	async didMount() {
		if (!navigator.serviceWorker)
			return mod.debugOn && console.info('Service worker not available');

		mod.registration = await navigator.serviceWorker.register('/service-worker.js');
		
		mod.debugOn && console.info('Service Worker Registered');

		mod.registration.addEventListener('updatefound', mod.updatefound);

		navigator.serviceWorker.addEventListener('controllerchange', mod.controllerchange);
	},

};

import { onMount } from 'svelte';
onMount(mod.didMount);
</script>

{#if mod.isVisible}
	<toast>
		<button class="close" onclick={ () => mod.isVisible = false }>new update available</button>
		<button onclick={ mod.skipWaiting }>Reload</button>
	</toast>
{/if}

<style>
toast {
	--spacing: 10px;
	--corner: 3px;

	border: 1px solid #b265ff;
	border-radius: var(--corner);
	
	position: fixed;
	margin: var(--spacing);
	top: 0;
	right: 0;
	
	background: #8000ff;
	color: white;
	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;

	display: flex;

	button {
		padding: var(--spacing);
		
		color: white;

		&.close {
			opacity: 0.8;
		}

		appearance: none;
		border: 0;
		background: none;
	}
}
</style>