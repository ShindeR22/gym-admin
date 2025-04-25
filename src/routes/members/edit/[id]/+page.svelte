<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getMember, updateMember, type MemberFormData } from '../../memberapi';
	import { page } from '$app/stores';

	let member: MemberFormData = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		birthdate: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		membershipPlan: '',
		paymentMethod: '',
		startDate: '',
		endDate: '',
		emergencyContact: '',
		emergencyPhone: '',
		notes: ''
	};

	let loading = true;
	let error = '';
	let success = '';

	onMount(async () => {
		try {
			// Debug URL and get the member ID
			const fullPath = window.location.pathname;
			// console.log('Full URL path:', fullPath);

			// Debug all path segments
			const pathSegments = fullPath.split('/');
			// console.log('Path segments:', pathSegments);

			// For a URL like http://localhost:5173/members/edit/680b2418fddd27e712cb1c22
			// We want the last segment which looks like a MongoDB/UUID ID
			const memberId = pathSegments[pathSegments.length - 1];
			// console.log('Extracted memberId:', memberId);

			// If using $page.params, debug that too
			// console.log('$page.params:', $page.params);
			// console.log('$page.params.id:', $page.params.id);

			// Since your ID appears to be non-numeric, don't use parseInt
			member = await getMember(memberId);

			// Format dates for input fields
			if (member.startDate) {
				member.startDate = new Date(member.startDate).toISOString().split('T')[0];
			}
			if (member.endDate) {
				member.endDate = new Date(member.endDate).toISOString().split('T')[0];
			}
			if (member.birthdate) {
				member.birthdate = new Date(member.birthdate).toISOString().split('T')[0];
			}
		} catch (e) {
			console.error('Error loading member:', e);
			error = e instanceof Error ? e.message : 'Failed to load member data';
		} finally {
			loading = false;
		}
	});

	async function handleSubmit() {
		try {
			// Get the ID the same way as in onMount
			const pathSegments = window.location.pathname.split('/');
			const memberId = pathSegments[pathSegments.length - 1];
			// console.log('Submitting for memberId:', memberId);

			await updateMember(memberId, member);
			success = 'Member updated successfully';
			setTimeout(() => {
				goto('/members');
			}, 1500);
		} catch (e) {
			console.error('Error updating member edit:', e);
			error = e instanceof Error ? e.message : 'Failed to update member edit';
		}
	}
</script>

<div class="max-w-4xl mx-auto p-4">
	<div class="flex justify-between items-center mb-6">
		<div>
			<h1 class="text-2xl font-bold text-gray-800">Edit Member</h1>
			<p class="text-gray-500 text-sm mt-1">Update member information</p>
		</div>
		<button
			class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center"
			on:click={() => goto('/members')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 mr-1"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to Members
		</button>
	</div>

	{#if loading}
		<div class="bg-white p-8 rounded-lg shadow flex justify-center items-center">
			<div class="text-gray-500">Loading member data...</div>
		</div>
	{:else if error}
		<div class="bg-red-50 p-4 rounded-lg mb-6">
			<div class="text-red-700">{error}</div>
		</div>
	{:else}
		{#if success}
			<div class="bg-green-50 p-4 rounded-lg mb-6">
				<div class="text-green-700">{success}</div>
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="bg-white p-6 rounded-lg shadow">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Personal Information Section -->
				<div class="md:col-span-2">
					<h2 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
						Personal Information
					</h2>
				</div>

				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700 mb-1"
						>First Name</label
					>
					<input
						type="text"
						id="firstName"
						bind:value={member.firstName}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700 mb-1"
						>Last Name</label
					>
					<input
						type="text"
						id="lastName"
						bind:value={member.lastName}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
					<input
						type="email"
						id="email"
						bind:value={member.email}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
					<input
						type="tel"
						id="phone"
						bind:value={member.phone}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1"
						>Birth Date</label
					>
					<input
						type="date"
						id="birthdate"
						bind:value={member.birthdate}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Address Section -->
				<div class="md:col-span-2">
					<h2 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 mt-4">Address</h2>
				</div>

				<div class="md:col-span-2">
					<label for="address" class="block text-sm font-medium text-gray-700 mb-1"
						>Street Address</label
					>
					<input
						type="text"
						id="address"
						bind:value={member.address}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
					<input
						type="text"
						id="city"
						bind:value={member.city}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
					<input
						type="text"
						id="state"
						bind:value={member.state}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
					<input
						type="text"
						id="zipCode"
						bind:value={member.zipCode}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Membership Information Section -->
				<div class="md:col-span-2">
					<h2 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 mt-4">
						Membership Information
					</h2>
				</div>

				<div>
					<label for="membershipPlan" class="block text-sm font-medium text-gray-700 mb-1"
						>Membership Plan</label
					>
					<select
						id="membershipPlan"
						bind:value={member.membershipPlan}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Select Plan</option>
						<option value="Premium">Premium</option>
						<option value="Standard">Standard</option>
						<option value="Monthly">Monthly</option>
						<option value="Trial">Trial</option>
					</select>
				</div>

				<div>
					<label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1"
						>Payment Method</label
					>
					<select
						id="paymentMethod"
						bind:value={member.paymentMethod}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Select Method</option>
						<option value="Credit Card">Credit Card</option>
						<option value="Debit Card">Debit Card</option>
						<option value="Bank Transfer">Bank Transfer</option>
						<option value="Cash">Cash</option>
					</select>
				</div>

				<div>
					<label for="startDate" class="block text-sm font-medium text-gray-700 mb-1"
						>Start Date</label
					>
					<input
						type="date"
						id="startDate"
						bind:value={member.startDate}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
					<input
						type="date"
						id="endDate"
						bind:value={member.endDate}
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Emergency Contact Section -->
				<div class="md:col-span-2">
					<h2 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 mt-4">
						Emergency Contact
					</h2>
				</div>

				<div>
					<label for="emergencyContact" class="block text-sm font-medium text-gray-700 mb-1"
						>Contact Name</label
					>
					<input
						type="text"
						id="emergencyContact"
						bind:value={member.emergencyContact}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<div>
					<label for="emergencyPhone" class="block text-sm font-medium text-gray-700 mb-1"
						>Contact Phone</label
					>
					<input
						type="tel"
						id="emergencyPhone"
						bind:value={member.emergencyPhone}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<!-- Additional Information Section -->
				<div class="md:col-span-2">
					<h2 class="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 mt-4">
						Additional Information
					</h2>
				</div>

				<div class="md:col-span-2">
					<label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
					<textarea
						id="notes"
						bind:value={member.notes}
						rows="4"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></textarea>
				</div>
			</div>

			<div class="mt-8 flex justify-end gap-3">
				<button
					type="button"
					on:click={() => goto('/members')}
					class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
				>
					Update Member
				</button>
			</div>
		</form>
	{/if}
</div>
