import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '../../../../lib/Server/prisma';

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


export const DELETE: RequestHandler = async ({ params }) => {
        // Leave this as a string—no Number(...)
        const id = params.id;

        try {
                await prisma.member.delete({ where: { id } });
                return new Response(null, { status: 204 });
        } catch (err) {
                console.error('Delete error:', err);
                return new Response(
                        JSON.stringify({ error: 'Failed to delete' }),
                        {
                                status: 500,
                                headers: { 'Content-Type': 'application/json' }
                        }
                );
        }
};