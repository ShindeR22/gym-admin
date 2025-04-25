<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { deleteMember, getMembers } from './memberapi';

	// Types for type safety
	interface Member {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		membershipPlan: string;
		startDate: string;
		endDate: string;
	}

	let members: Member[] = [];
	let searchQuery = '';
	let selectedFilter: 'All' | 'Active' | 'Inactive' | 'Pending' = 'All';
	let loading = true;
	let error = '';

	// Derive status and joinDate for UI
	const deriveStatus = (m: Member) => {
		const now = new Date();
		const start = new Date(m.startDate);
		const end = new Date(m.endDate);
		if (start > now) return ' Inactive';
		if (end >= now) return 'Active';
		return 'Pending';
	};

	// Fetch members from API
	onMount(async () => {
		try {
			members = await getMembers();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			loading = false;
		}
	});

	$: filteredMembers = members.filter((member) => {
		const name = `${member.firstName} ${member.lastName}`;
		const matchesSearch =
			name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			member.email.toLowerCase().includes(searchQuery.toLowerCase());
		const status = deriveStatus(member);
		const matchesFilter = selectedFilter === 'All' || status === selectedFilter;
		return matchesSearch && matchesFilter;
	});

	// fetch + delete:

	async function handleDelete(id: number) {
		try {
			await deleteMember(id);
			members = members.filter((m) => m.id !== id);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown delete error';
		}
	}
</script>

<div class="pt-4">
	<div class="flex justify-between items-center mb-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-800">Members</h1>
			<p class="text-gray-500 text-m mt-1">Manage your gym membership database</p>
		</div>
		<button
			class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center"
			on:click={() => goto('/members/add')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 mr-1"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			Add New Member
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
		<div class="bg-white rounded-lg shadow p-5">
			<div class="flex items-center">
				<div class="p-3 rounded-full bg-indigo-100 text-indigo-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-gray-500 text-m">Total Members</p>
					<p class="text-2xl font-bold text-gray-800">1,284</p>
					<p class="text-green-500 text-m flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 10l7-7m0 0l7 7m-7-7v18"
							/>
						</svg>
						+12% from last month
					</p>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-lg shadow p-5">
			<div class="flex items-center">
				<div class="p-3 rounded-full bg-green-100 text-green-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-gray-500 text-m">Active Members</p>
					<p class="text-2xl font-bold text-gray-800">1,051</p>
					<p class="text-green-500 text-m flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 10l7-7m0 0l7 7m-7-7v18"
							/>
						</svg>
						+8% from last month
					</p>
				</div>
			</div>
		</div>
		<div class="bg-white rounded-lg shadow p-5">
			<div class="flex items-center">
				<div class="p-3 rounded-full bg-blue-100 text-blue-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div class="ml-4">
					<p class="text-gray-500 text-m">New This Month</p>
					<p class="text-2xl font-bold text-gray-800">78</p>
					<p class="text-green-500 text-m flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 10l7-7m0 0l7 7m-7-7v18"
							/>
						</svg>
						+15% from last month
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-white rounded-lg shadow overflow-hidden mb-6">
		<div
			class="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
		>
			<div class="flex items-center gap-3">
				<div class="relative">
					<select
						bind:value={selectedFilter}
						class="border rounded-md px-3 py-2 w-40 text-gray-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
					>
						<option>All</option>
						<option>Active</option>
						<option>Inactive</option>
						<option>Pending</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg
							class="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</div>
				</div>

				<div class="hidden md:flex gap-2">
					<button class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-m font-medium">
						Export CSV
					</button>
					<button class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-m font-medium">
						Print
					</button>
				</div>
			</div>

			<div class="relative w-full md:w-64">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search members..."
					class="border rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
				/>
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
			</div>
		</div>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Name</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Mobile NO</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Membership Plan</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Status</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Join Date</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>End Date</th
						>
						<th
							class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each filteredMembers as member (member.id)}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div
										class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium"
									>
										{`${member.firstName} ${member.lastName}`
											.split(' ')
											.map((n: string) => n[0])
											.join('')}
									</div>
									<div class="ml-4">
										<div class="text-m font-medium text-gray-900">
											{member.firstName}
											{member.lastName}
										</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap"
								><div class="text-m text-gray-500">{member.phone}</div></td
							>
							<td class="px-6 py-4 whitespace-nowrap"
								><div class="text-m text-gray-900">{member.membershipPlan}</div></td
							>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
									class:!bg-green-100={!deriveStatus(member)}
								>
									{deriveStatus(member)}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-m text-gray-500"
								>{new Date(member.startDate).toLocaleDateString()}</td
							>
							<td class="px-6 py-4 whitespace-nowrap text-m text-gray-500"
								>{new Date(member.endDate).toLocaleDateString()}</td
							>
							<td class="px-6 py-4 whitespace-nowrap text-right text-m font-medium">
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									class="text-indigo-600 hover:text-indigo-900 mr-3"
									on:click={() => goto(`/members/edit/${member.id}`)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
										/>
									</svg>
								</button>
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									class="text-red-600 hover:text-red-900"
									on:click={() => handleDelete(member.id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</button>
							</td>
						</tr>
					{/each}
					{#if filteredMembers.length === 0}
						<tr
							><td colspan="6" class="px-6 py-4 text-center text-gray-500"
								>No members found matching your search criteria</td
							></tr
						>
					{/if}
				</tbody>
			</table>
		</div>

		<div class="px-6 py-4 border-t flex justify-between items-center">
			<div class="text-gray-500 text-m">
				Showing {filteredMembers.length} of {members.length} members
			</div>
			<div class="flex space-x-1">
				<button class="border rounded px-3 py-1 text-m hover:bg-gray-50">Previous</button>
				<button class="bg-indigo-600 text-white rounded px-3 py-1 text-m">1</button>
				<button class="border rounded px-3 py-1 text-m hover:bg-gray-50">2</button>
				<button class="border rounded px-3 py-1 text-m hover:bg-gray-50">3</button>
				<button class="border rounded px-3 py-1 text-m hover:bg-gray-50">Next</button>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="bg-white rounded-lg shadow p-6">
			<h2 class="text-lg font-semibold mb-4">Recent Activities</h2>
			<div class="space-y-4">
				<div class="flex items-start">
					<div
						class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<div>
						<p class="text-m font-medium">Thomas Wilson registered as a new member</p>
						<p class="text-xs text-gray-500">15 minutes ago</p>
					</div>
				</div>
				<div class="flex items-start">
					<div
						class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</div>
					<div>
						<p class="text-m font-medium">Sarah Parker updated her profile information</p>
						<p class="text-xs text-gray-500">1 hour ago</p>
					</div>
				</div>
				<div class="flex items-start">
					<div
						class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 mr-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
							/>
						</svg>
					</div>
					<div>
						<p class="text-m font-medium">Michael Roberts membership expired</p>
						<p class="text-xs text-gray-500">3 hours ago</p>
					</div>
				</div>
				<div class="flex items-start">
					<div
						class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 mr-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div>
						<p class="text-m font-medium">Emma Wilson upgraded to Premium plan</p>
						<p class="text-xs text-gray-500">Yesterday</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<h2 class="text-lg font-semibold mb-4">Membership Distribution</h2>
			<div class="space-y-4">
				<div>
					<div class="flex justify-between mb-1">
						<span class="text-m font-medium">Premium</span>
						<span class="text-m text-gray-500">45%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div class="bg-indigo-600 h-2 rounded-full" style="width: 45%"></div>
					</div>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span class="text-m font-medium">Standard</span>
						<span class="text-m text-gray-500">35%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div class="bg-blue-500 h-2 rounded-full" style="width: 35%"></div>
					</div>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span class="text-m font-medium">Monthly</span>
						<span class="text-m text-gray-500">15%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div class="bg-green-500 h-2 rounded-full" style="width: 15%"></div>
					</div>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span class="text-m font-medium">Trial</span>
						<span class="text-m text-gray-500">5%</span>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div class="bg-yellow-500 h-2 rounded-full" style="width: 5%"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
