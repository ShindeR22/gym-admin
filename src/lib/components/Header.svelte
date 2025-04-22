<script>
	import { User, Bell } from 'svelte-heros';
</script>

<header class="bg-white shadow p-4 flex justify-between items-center border-b">
	<div class="flex items-center gap-4">
		<!-- <h1 class="text-xl font-bold text-purple-700">FLEX GYM</h1> -->
	</div>

	<div class="flex items-center gap-4">
		<input
			type="text"
			placeholder="Search..."
			class="p-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E1F89] text-sm"
		/>
		<Bell class="h-6 w-6 text-[#2E1F89] cursor-pointer hover:text-purple-900 transition" />
		<div
			class="w-8 h-8 bg-[#2E1F89] rounded-full flex items-center justify-center text-white text-sm font-semibold"
		>
			JD
		</div>
	</div>
</header>
