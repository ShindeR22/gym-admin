<!-- src/lib/components/Sidebar.svelte -->
<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

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

<nav class="bg-[#2E1F89] text-white w-64 h-screen flex flex-col justify-between">
	<div>
		<div class="text-2xl font-bold px-6 py-4">FLEX GYM</div>
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
					<button on:click={handleLogout} class="text-xs text-gray-300 hover:text-white">
						Sign out
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-[#3A2CA1] p-4">
			<a href="/signin" class="text-sm font-medium hover:text-gray-300">signin</a>
		</div>
	{/if}
</nav>
