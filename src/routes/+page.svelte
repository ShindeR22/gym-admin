<script>
	import DashboardMetrics from '../lib/components/DashboardMetrics.svelte';
	import ClassesTable from '../lib/components/ClassesTable.svelte';
	import classesData from '$lib/data/classes.json';
	import activities from '$lib/data/activities.json';
	import members from '$lib/data/members.json';
	import RecentActivities from '$lib/components/RecentActivities.svelte';
	import NewMembers from '$lib/components/NewMembers.svelte';
</script>

<div class="flex justify-between items-center mb-4">
	<h2 class="text-2xl font-bold">Dashboard</h2>
	<button class="bg-[#2E1F89] text-white px-4 py-2 rounded">Add New Member</button>
</div>

<DashboardMetrics />
<ClassesTable />
<RecentActivities {activities} />
<NewMembers {members} />
