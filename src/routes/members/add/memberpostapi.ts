"use client"

// Type definition for form data
export interface MemberFormData {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthdate: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        membershipPlan: string;
        paymentMethod: string;
        startDate: string;
        endDate: string;
        emergencyContact: string;
        emergencyPhone: string;
        notes: string;
}

export interface MemberResponse {
        member: {
                id: string;
        }
}



export interface Member {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        membershipPlan: string;
        startDate: string;
        endDate: string;
        // …add extra fields as your API returns them
}

export interface MemberResponse {
        member: { id: string };
}

export interface MembersResponse {
        success: boolean;
        members: Member[];
        error?: string;
}


export async function createMember(memberFormData: Partial<MemberFormData>): Promise<MemberResponse> {
        const response = await fetch('/api/members', {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(memberFormData),
        });

        if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Failed to add member');
        }

        return response.json();
}




// * Fetch all members

export async function getMembers(): Promise<Member[]> {
        const response = await fetch('/api/members');
        const data: MembersResponse = await response.json();
        if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to load members');
        }
        return data.members;
}