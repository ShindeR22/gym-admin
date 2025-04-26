<script lang="ts">
	import { Bell } from 'svelte-heros';
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { isMobile, isSidebarOpen } from '$lib/stores';

	// Access the session data
	$: user = $page.data.session?.user;

	// Create initials from user name or email
	$: initials = user?.name
		? `${user.name.split(' ')[0][0]}${user.name.split(' ').length > 1 ? user.name.split(' ')[1][0] : ''}`
		: user?.email
			? user.email[0].toUpperCase()
			: 'U';

	function handleLogout() {
		signOut({ callbackUrl: '/signin' });
	}

	function toggleSidebar() {
		$isSidebarOpen = !$isSidebarOpen;
	}
</script>

<header class="bg-white shadow p-4 flex justify-between items-center border-b">
	<div class="flex items-center gap-4">
		{#if $isMobile}
			<button on:click={toggleSidebar} class="mr-4">
				<div class="w-6 h-0.5 bg-[#2E1F89] mb-1"></div>
				<div class="w-6 h-0.5 bg-[#2E1F89] mb-1"></div>
				<div class="w-6 h-0.5 bg-[#2E1F89]"></div>
			</button>
		{/if}
		<!-- <h1 class="text-xl font-bold text-purple-700">FLEX GYM</h1> -->
	</div>

	<div class="flex items-center gap-4">
		<input
			type="text"
			placeholder="Search..."
			class="p-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E1F89] text-sm"
		/>
		<Bell class="h-6 w-6 text-[#2E1F89] cursor-pointer hover:text-purple-900 transition" />

		{#if user}
			<div class="relative group">
				<div
					class="w-8 h-8 bg-[#2E1F89] rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
					aria-label="User profile"
				>
					{#if user.image}
						<img src={user.image} alt={user.name || 'User'} class="w-8 h-8 rounded-full" />
					{:else}
						{initials}
					{/if}
				</div>
			</div>
		{:else}
			<a href="/signin" class="text-[#2E1F89] hover:text-purple-900 transition text-sm font-medium">
				signin
			</a>
		{/if}
	</div>
</header>
