<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';

	// Check if user is already logged in and redirect to dashboard
	$: if ($page.data.session?.user) {
		goto('/dashboard');
	}

	// function handleGoogleLogin() {
	// 	signIn( { callbackUrl: '/dashboard' });
	// }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
		<div class="text-center">
			<h1 class="text-4xl font-bold text-[#2E1F89] mb-2">FLEX GYM</h1>
			<h2 class="text-2xl font-semibold text-gray-800">Sign in to your account</h2>
			<p class="mt-2 text-gray-600">Welcome back! Please sign in to continue.</p>
		</div>
		<div class="mt-8 space-y-6">
			<button
				class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2E1F89] hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E1F89] transition-colors"
			>
				<span class="flex items-center">
					<!-- Google icon - simplified SVG -->
					<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
						/>
					</svg>
					Sign in with Google
				</span>
			</button>

			<div class="text-center text-sm text-gray-500 mt-4">
				<p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
			</div>
		</div>

		<SignIn provider="google">
			<div class="mt-8 space-y-6">
				<button
					class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2E1F89] hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E1F89] transition-colors"
				>
					<span class="flex items-center">
						<!-- Google icon - simplified SVG -->
						<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
							/>
						</svg>
						Sign in with Google
					</span>
				</button>

				<div class="text-center text-sm text-gray-500 mt-4">
					<p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
				</div>
			</div>
		</SignIn>
	</div>
</div>
