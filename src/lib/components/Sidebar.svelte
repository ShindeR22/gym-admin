<script>
	import { base } from '$app/paths';
</script>

<nav class="bg-[#2E1F89] text-white w-64 h-screen flex flex-col justify-between">
	<div>
		<div class="text-2xl font-bold px-6 py-4">FLEX GYM</div>
		<ul class="space-y-2 px-2 pt-4">
			<li>
				<a
					href="{base}/"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>📊</span> Dashboard
				</a>
			</li>
			<li>
				<a
					href="{base}/members"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>👥</span> Members
				</a>
			</li>
			<li>
				<a
					href="{base}/classes"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>🏋️</span> Classes
				</a>
			</li>
			<li>
				<a
					href="{base}/schedule"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>🗓️</span> Schedule
				</a>
			</li>
			<li>
				<a
					href="{base}/billing"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>💳</span> Billing
				</a>
			</li>
			<li>
				<a
					href="{base}/settings"
					class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#3A2CA1] transition"
				>
					<span>⚙️</span> Settings
				</a>
			</li>
		</ul>
	</div>

	<!-- User Profile Footer -->
	<div class="bg-[#3A2CA1] p-4 flex items-center gap-3">
		<div
			class="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center font-bold text-sm"
		>
			JD
		</div>
		<div>
			<p class="text-sm font-semibold">John Doe</p>
			<p class="text-xs text-gray-300">Admin</p>
		</div>
	</div>
</nav>
