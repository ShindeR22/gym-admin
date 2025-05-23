
import Google from "@auth/core/providers/google"
import { SvelteKitAuth } from "@auth/sveltekit"

export const { handle, signIn, signOut } = SvelteKitAuth({
        trustHost: true,
        providers: [Google],
})