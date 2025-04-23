<!-- AddMemberForm.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createMember, type MemberFormData } from './memberpostapi';

	// Initialize form data with default values
	let formData: MemberFormData = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		birthdate: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		membershipPlan: 'Standard',
		paymentMethod: 'Credit Card',
		startDate: new Date().toISOString().split('T')[0],
		endDate: '', // Added endDate field
		emergencyContact: '',
		emergencyPhone: '',
		notes: ''
	};

	let isSubmitting = false;
	let errorMessage = '';
	let successMessage = '';

	// Calculate default end date (1 month from today)
	onMount(() => {
		const defaultEndDate = new Date();
		defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);
		formData.endDate = defaultEndDate.toISOString().split('T')[0];
	});

	// Handle form submission
	const handleSubmit = async () => {
		try {
			isSubmitting = true;
			errorMessage = '';

			const result = await createMember(formData);

			successMessage = 'Member added successfully!';

			// Navigate back to members list after successful submission
			setTimeout(() => {
				goto('/members');
			}, 1500);
		} catch (error) {
			console.error('Error adding member:', error);
			errorMessage = error instanceof Error ? error.message : 'Failed to add member';
		} finally {
			isSubmitting = false;
		}
	};

	// Function to handle form cancellation
	const handleCancel = () => {
		goto('/members');
	};
</script>

<div class="bg-gray-100 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
	<div class="flex items-center justify-between mb-6">
		<h2 class="text-2xl font-bold text-gray-800">Add New Member</h2>
	</div>

	{#if errorMessage}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
			<p>{errorMessage}</p>
		</div>
	{/if}

	{#if successMessage}
		<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
			<p>{successMessage}</p>
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<!-- Personal Information Section -->
		<div class="bg-white p-4 rounded-md">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
			<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="firstName"
						>First Name*</label
					>
					<input
						type="text"
						id="firstName"
						bind:value={formData.firstName}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="lastName"
						>Last Name*</label
					>
					<input
						type="text"
						id="lastName"
						bind:value={formData.lastName}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="phone"
						>Phone Number*</label
					>
					<input
						type="tel"
						id="phone"
						bind:value={formData.phone}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="email"
						>Email Address*</label
					>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="birthdate"
						>Date of Birth</label
					>
					<input
						type="date"
						id="birthdate"
						bind:value={formData.birthdate}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
			</div>
		</div>

		<!-- Address Section -->
		<div class="bg-white p-4 rounded-md">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Address</h3>
			<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
				<div class="md:col-span-2">
					<label class="block text-sm font-medium text-gray-700 mb-1" for="address"
						>Street Address</label
					>
					<input
						type="text"
						id="address"
						bind:value={formData.address}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="city">City</label>
					<input
						type="text"
						id="city"
						bind:value={formData.city}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="state">State</label>
						<input
							type="text"
							id="state"
							bind:value={formData.state}
							class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" for="zipCode"
							>Zip Code</label
						>
						<input
							type="text"
							id="zipCode"
							bind:value={formData.zipCode}
							class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Membership Information Section -->
		<div class="bg-white p-4 rounded-md">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Membership Information</h3>
			<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="membershipPlan"
						>Membership Plan*</label
					>
					<select
						id="membershipPlan"
						bind:value={formData.membershipPlan}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					>
						<option value="Standard">Standard</option>
						<option value="Premium">Premium</option>
						<option value="Monthly">Monthly</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="paymentMethod"
						>Payment Method*</label
					>
					<select
						id="paymentMethod"
						bind:value={formData.paymentMethod}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					>
						<option value="Credit Card">Credit Card</option>
						<option value="Debit Card">Debit Card</option>
						<option value="UPI">UPI</option>
						<option value="Cash">Cash</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="startDate"
						>Start Date*</label
					>
					<input
						type="date"
						id="startDate"
						bind:value={formData.startDate}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="endDate">End Date*</label
					>
					<input
						type="date"
						id="endDate"
						bind:value={formData.endDate}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
						required
					/>
				</div>
			</div>
		</div>

		<!-- Emergency Contact Section -->
		<div class="bg-white p-4 rounded-md">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
			<div class="grid grid-cols-2 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="emergencyContact"
						>Name</label
					>
					<input
						type="text"
						id="emergencyContact"
						bind:value={formData.emergencyContact}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1" for="emergencyPhone"
						>Phone Number</label
					>
					<input
						type="tel"
						id="emergencyPhone"
						bind:value={formData.emergencyPhone}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
			</div>
		</div>

		<!-- Additional Notes Section -->
		<div class="bg-white p-4 rounded-md">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
			<div>
				<textarea
					id="notes"
					bind:value={formData.notes}
					rows="3"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					placeholder="Add any additional information about this member..."
				></textarea>
			</div>
		</div>

		<!-- Form Actions -->
		<div class="flex justify-end space-x-3">
			<button
				type="button"
				class="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				on:click={handleCancel}
				disabled={isSubmitting}
			>
				Cancel
			</button>
			<button
				type="submit"
				class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Adding...' : 'Add Member'}
			</button>
		</div>
	</form>
</div>
