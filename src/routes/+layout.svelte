<script>
	import '../app.css';
	import Header from '../lib/components/Header.svelte';
	import Sidebar from '../lib/components/Sidebar.svelte';
</script>

<div class="h-screen flex flex-col">
	<!-- Fixed Header -->

	<div class="flex flex-1">
		<!-- Fixed Sidebar -->
		<div class="fixed left-0 h-[calc(100vh-4rem)] w-64 z-40 bg-white border-r">
			<Sidebar />
		</div>

		<!-- Scrollable Main Content -->
		<main class="ml-64 mt-16 p-4 overflow-y-auto h-[calc(100vh-4rem)] w-full">
			<div class="fixed top-0 left-0 right-0 z-50 ml-64">
				<Header />
			</div>
			<slot />
		</main>
	</div>
</div>
