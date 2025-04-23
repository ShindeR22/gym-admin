// src/routes/+page.server.ts

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
        const session = await locals.getSession();

        // Redirect to dashboard if logged in, otherwise to signin page
        if (session?.user) {
                throw redirect(303, '/dashboard');
        } else {
                throw redirect(303, '/signin');
        }
};      