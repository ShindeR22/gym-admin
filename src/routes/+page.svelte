<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import DashboardMetrics from '$lib/components/DashboardMetrics.svelte';
	import ClassesTable from '$lib/components/ClassesTable.svelte';
	import activities from '$lib/data/activities.json';
	import members from '$lib/data/members.json';
	import RecentActivities from '$lib/components/RecentActivities.svelte';
	import NewMembers from '$lib/components/NewMembers.svelte';

	$: user = $page.data.session?.user;
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h2 class="text-2xl font-bold">Dashboard</h2>
			{#if user?.name}
				<p class="text-sm text-gray-600">Welcome back, {user.name.split(' ')[0]}!</p>
			{/if}
		</div>
		<button class="bg-[#2E1F89] text-white px-4 py-2 rounded">Add New Member</button>
	</div>

	<DashboardMetrics />

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold mb-4">Today's Classes</h3>
			<ClassesTable />
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
			<RecentActivities {activities} />
		</div>
	</div>

	<div class="bg-white rounded-lg shadow p-6">
		<h3 class="text-lg font-semibold mb-4">New Members</h3>
		<NewMembers {members} />
	</div>
</div>
