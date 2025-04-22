import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import prisma from '../../../lib/Server/prisma';

export const POST = async ({ request }: RequestEvent) => {
        try {
                const memberData = await request.json();

                // Validation for required fields
                const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'membershipPlan', 'paymentMethod', 'startDate', 'endDate'];

                for (const field of requiredFields) {
                        if (!memberData[field]) {
                                return json({ error: `${field} is required` }, { status: 400 });
                        }
                }

                // Create new member in database
                const newMember = await prisma.member.create({
                        data: memberData
                });

                return json({ success: true, member: newMember }, { status: 201 });
        } catch (error) {
                console.error('Error creating member:', error);
                return json({ error: 'Failed to add member' }, { status: 500 });
        }
};

// Get all members
export const GET = async () => {
        try {
                const members = await prisma.member.findMany({
                        orderBy: { createdAt: 'desc' }
                });

                return json(members);
        } catch (error) {
                console.error('Error fetching members:', error);
                return json({ error: 'Failed to fetch members' }, { status: 500 });
        }
};