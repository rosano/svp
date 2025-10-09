<script>
import 'normalize.css';
import favicon from '$lib/assets/favicon.svg';
import Toast from './toast.svelte';

import { page } from '$app/state';
let { children, data } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="{ page.data.viewport || 'width=device-width, initial-scale=1' }" />
	
	<link rel="icon" href={favicon} />
	<title>{ page.data.title }</title>
</svelte:head>

<header>
	<nav>
		{#each data.navigation as section, index}
			{#if index}&nbsp;·&nbsp;{/if}<a href="{section.path}">{section.title}</a>
		{/each}
	</nav>
</header>

{@render children?.()}

<Toast></Toast>
