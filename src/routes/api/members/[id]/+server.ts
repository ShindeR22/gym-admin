import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '../../../../lib/Server/prisma';

// export const GET = async () => {
//         try {
//                 const members = await prisma.member.findMany({
//                         orderBy: {
//                                 id: 'desc'
//                         }
//                 });
//                 return json({ success: true, members }, { status: 200 });
//         } catch (error) {
//                 console.error('Error fetching members:', error);
//                 return json({ error: 'Failed to fetch members' }, { status: 500 });
//         }
// };


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

export const GET: RequestHandler = async ({ params }) => {
        const id = params.id;

        try {
                const member = await prisma.member.findUnique({
                        where: { id }
                });

                if (!member) {
                        return json({ error: 'Member not found' }, { status: 404 });
                }

                return json({ success: true, member }, { status: 200 });
        } catch (error) {
                console.error('Error fetching member:', error);
                return json({ error: 'Failed to fetch member edit' }, { status: 500 });
        }
};


export const PUT: RequestHandler = async ({ params, request }) => {
        const id = params.id;
        const data = await request.json();

        try {
                // Remove the id property from data to prevent the error
                const { id: dataId, createdAt, updatedAt, ...updateData } = data;

                const updatedMember = await prisma.member.update({
                        where: { id: id },
                        data: updateData
                });

                return json({ success: true, member: updatedMember }, { status: 200 });
        } catch (error) {
                console.error('Error updating member:', error);
                return json({
                        error: 'Failed to update member ',
                        // details: error.message
                }, { status: 500 });
        }
};