<script>
	import { UserPlus, CheckCircle, DollarSign, XCircle, Settings } from 'lucide-svelte';
	export let activities = [];

	const iconMap = {
		'user-plus': UserPlus,
		'check-circle': CheckCircle,
		'dollar-sign': DollarSign,
		'x-circle': XCircle,
		settings: Settings
	};
</script>

<div class="bg-white p-4 rounded-lg shadow">
	<div class="flex justify-between items-center mb-4">
		<h3 class="text-lg font-bold">Recent Activities</h3>
		<a href="/activities" class="text-purple-600 hover:underline">View All</a>
	</div>

	<ul class="divide-y divide-gray-200">
		{#each activities as act}
			<li class="flex justify-between items-center py-3">
				<div class="flex items-center space-x-3">
					<span
						class="p-2 rounded-full"
						class:bg-green-100={act.icon === 'user-plus'}
						class:text-green-700={act.icon === 'user-plus'}
						class:bg-blue-100={act.icon === 'check-circle'}
						class:text-blue-700={act.icon === 'check-circle'}
						class:bg-purple-100={act.icon === 'dollar-sign'}
						class:text-purple-700={act.icon === 'dollar-sign'}
						class:bg-red-100={act.icon === 'x-circle'}
						class:text-red-700={act.icon === 'x-circle'}
						class:bg-yellow-100={act.icon === 'settings'}
						class:text-yellow-700={act.icon === 'settings'}
					>
						{#if iconMap[act.icon]}
							<svelte:component this={iconMap[act.icon]} size="16" />
						{/if}
					</span>
					<div>
						<p class="font-medium text-gray-800">{act.title}</p>
						<p class="text-sm text-gray-500">{act.subtitle}</p>
					</div>
				</div>
				<span class="text-sm text-gray-400">{act.timeAgo}</span>
			</li>
		{/each}
	</ul>
</div>
