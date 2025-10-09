<script>
import { updated } from '$app/state';

let _updateVisible = true;
</script>

{#if updated.current && _updateVisible}
	<toast onclick={ () => _updateVisible = false }>
		<p>new update available</p>
		<a href="#" onclick={ () => location.reload() }>Reload</a>
	</toast>
{/if}

<style type="text/css">
toast {
	--spacing: 10px;
	--corner: 3px;

	padding: var(--spacing);
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
	gap: var(--spacing);

	/* DisableTextSelection */
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

	p {
		margin: 0;
		opacity: 0.8;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
}
</style>