<script>
	import { isMobile } from '$lib/stores';
</script>

{#if $isMobile}{/if}

<div class="bg-white p-4 rounded-lg shadow">
	<div class="flex justify-between items-center mb-4">
		<h3 class="text-lg font-bold">Today's Classes</h3>
		<a href="/classes" class="text-purple-600 hover:underline">View All</a>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full text-sm text-left divide-y divide-gray-200">
			<thead>
				<tr class="bg-gray-50">
					<th class="py-3 px-4 font-bold text-gray-600">Class Name</th>
					<th class="py-3 px-4 font-bold text-gray-600">Instructor</th>
					<th class="py-3 px-4 font-bold text-gray-600">Time</th>
					{#if !$isMobile}
						<th class="py-3 px-4 font-bold text-gray-600">Capacity</th>
						<th class="py-3 px-4 font-bold text-gray-600">Status</th>
					{/if}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<tr>
					<td class="py-4 px-4">Morning Yoga</td>
					<td class="py-4 px-4">Emma Wilson</td>
					<td class="py-4 px-4">07:00 – 08:00</td>
					{#if !$isMobile}
						<td class="py-4 px-4">18/20</td>

						<td class="py-4 px-4">
							<span
								class="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold"
							>
								In Progress
							</span>
						</td>
					{/if}
				</tr>
				<tr>
					<td class="py-4 px-4">HIIT Training</td>
					<td class="py-4 px-4">Mike Johnson</td>
					<td class="py-4 px-4">09:30 – 10:30</td>
					{#if !$isMobile}
						<td class="py-4 px-4">12/15</td>
						<td class="py-4 px-4">
							<span
								class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold"
							>
								Upcoming
							</span>
						</td>
					{/if}
				</tr>
				<tr>
					<td class="py-4 px-4">Spinning Class</td>
					<td class="py-4 px-4">Sarah Parker</td>
					<td class="py-4 px-4">12:00 – 13:00</td>
					{#if !$isMobile}
						<td class="py-4 px-4">20/20</td>
						<td class="py-4 px-4">
							<span
								class="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold"
							>
								Full
							</span>
						</td>
					{/if}
				</tr>
				<tr>
					<td class="py-4 px-4">Strength Training</td>
					<td class="py-4 px-4">David Brown</td>
					<td class="py-4 px-4">16:30 – 17:30</td>
					{#if !$isMobile}
						<td class="py-4 px-4">8/15</td>
						<td class="py-4 px-4">
							<span
								class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold"
							>
								Upcoming
							</span>
						</td>
					{/if}
				</tr>
				<tr>
					<td class="py-4 px-4">Evening Pilates</td>
					<td class="py-4 px-4">Lisa Chen</td>
					<td class="py-4 px-4">18:00 – 19:00</td>
					{#if !$isMobile}
						<td class="py-4 px-4">15/20</td>
						<td class="py-4 px-4">
							<span
								class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold"
							>
								Upcoming
							</span>
						</td>
					{/if}
				</tr>
			</tbody>
		</table>
	</div>
</div>
