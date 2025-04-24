import prisma from "$lib/Server/prisma";
import { json } from "@sveltejs/kit";

export const GET = async () => {
        try {
                const members = await prisma.member.findMany({
                        orderBy: {
                                id: 'desc'
                        }
                });
                return json({ success: true, members }, { status: 200 });
        } catch (error) {
                console.error('Error fetching members:', error);
                return json({ error: 'Failed to fetch members' }, { status: 500 });
        }
};
