<!-- src/lib/components/Sidebar.svelte -->
<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { isMobile, isSidebarOpen } from '$lib/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { SignOut } from '@auth/sveltekit/components';

	// Access the session data
	$: user = $page.data.session?.user;

	// Create initials from user name or email
	$: initials = user?.name
		? `${user.name.split(' ')[0][0]}${user.name.split(' ').length > 1 ? user.name.split(' ')[1][0] : ''}`
		: user?.email
			? user.email[0].toUpperCase()
			: 'U';

	// Get current path to highlight active item
	$: path = $page.url.pathname;

	function handleLogout() {
		signOut({ callbackUrl: '/signin' });
	}
</script>

{#if $isMobile && $isSidebarOpen}
	<div
		class="fixed inset-0 bg-transparent bg-opacity-50 z-10"
		on:click={() => ($isSidebarOpen = false)}
	></div>
{/if}

<!-- <nav
	class="fixed top-0 left-0 h-full w-64 bg-[#2E1F89] text-white z-20 transform transition-transform duration-300 ease-in-out flex flex-col justify-between {$isMobile
		? $isSidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'
		: 'translate-x-0'}"
> -->
<nav
	class="bg-[#2E1F89] top-0 left-0 h-full z-20 text-white w-64 flex flex-col justify-between {$isMobile
		? $isSidebarOpen
			? 'translate-x-0 '
			: '-translate-x-full fixed'
		: 'translate-x-0'}"
>
	<div>
		<div class="text-2xl font-bold px-6 py-4">BM Fitness</div>
		<ul class="space-y-2 px-2 pt-4">
			<li>
				<a
					href="{base}/dashboard"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path === '/dashboard' || path === '/' ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>📊</span> Dashboard
				</a>
			</li>
			<li>
				<a
					href="{base}/members"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path.startsWith('/members') ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>👥</span> Members
				</a>
			</li>
			<li>
				<a
					href="{base}/classes"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path.startsWith('/classes') ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>🏋️</span> Classes
				</a>
			</li>
			<li>
				<a
					href="{base}/schedule"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path.startsWith('/schedule') ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>🗓️</span> Schedule
				</a>
			</li>
			<li>
				<a
					href="{base}/billing"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path.startsWith('/billing') ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>💳</span> Billing
				</a>
			</li>
			<li>
				<a
					href="{base}/settings"
					class="flex items-center gap-3 px-4 py-2 rounded-lg
						{path.startsWith('/settings') ? 'bg-[#3A2CA1]' : 'hover:bg-[#3A2CA1]'} 
						transition"
				>
					<span>⚙️</span> Settings
				</a>
			</li>
		</ul>
	</div>

	<!-- User Profile Footer -->
	{#if user}
		<div class="bg-[#3A2CA1] p-4">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
					{#if user.image}
						<img src={user.image} alt={user.name || 'User'} class="w-10 h-10 rounded-full" />
					{:else}
						<div
							class="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center font-bold text-sm"
						>
							{initials}
						</div>
					{/if}
				</div>
				<div>
					<p class="text-sm font-semibold">{user.name || user.email}</p>
					<SignOut on:click={handleLogout} class="text-xs text-gray-300 hover:text-white">
						Sign out
					</SignOut>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-[#3A2CA1] p-4">
			<a href="/signin" class="text-sm font-medium hover:text-gray-300">signin</a>
		</div>
	{/if}
</nav>
