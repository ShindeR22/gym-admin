

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
        // Validate that the ID parameter is a number
        const id = parseInt(params.id);

        if (isNaN(id)) {
                throw error(400, 'Invalid member ID');
        }

        return {
                memberId: id
        };
};