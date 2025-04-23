<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	// Get the current route
	$: path = $page.url.pathname;

	// Check if user is on signin page or authenticated routes
	$: issigninPage = path === '/signin';
	$: isAuthenticated = !!$page.data.session?.user;
</script>

{#if issigninPage}
	<!-- Just render the signin page without layout -->
	<slot />
{:else}
	<div class="flex h-screen">
		<!-- Sidebar -->
		{#if isAuthenticated}
			<Sidebar />
		{/if}

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col {isAuthenticated ? '' : 'ml-0'}">
			<!-- Header -->
			<Header />

			<!-- Content -->
			<main class="p-6 overflow-auto flex-1">
				<slot />
			</main>
		</div>
	</div>
{/if}
