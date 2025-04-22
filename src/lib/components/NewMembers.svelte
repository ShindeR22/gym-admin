<script>
	export let members = [];
</script>

<div class="bg-white p-4 rounded-lg shadow mt-6">
	<div class="flex justify-between items-center mb-4">
		<h3 class="text-lg font-bold">New Members</h3>
		<a href="/members" class="text-purple-600 hover:underline">View All</a>
	</div>

	<ul class="divide-y divide-gray-200">
		{#each members as m}
			<li class="flex justify-between items-center py-3">
				<div class="flex items-center space-x-3">
					<div
						class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600"
					>
						{m.initials}
					</div>
					<div>
						<p class="font-medium text-gray-800">{m.name}</p>
						<p class="text-sm text-gray-500">{m.email}</p>
					</div>
				</div>
				<div class="text-right space-y-1">
					<span
						class="block px-2 py-1 rounded-full text-xs font-semibold"
						class:bg-purple-100={m.membership === 'Premium'}
						class:text-purple-700={m.membership === 'Premium'}
						class:bg-blue-100={m.membership === 'Standard'}
						class:text-blue-700={m.membership === 'Standard'}>{m.membership}</span
					>
					<span class="block text-sm text-gray-400">{m.joined}</span>
				</div>
			</li>
		{/each}
	</ul>
</div>
