

// * Fetch all members
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



export interface MembersResponse {
        success: boolean;
        members: Member[];
        error?: string;
}

export async function getMembers(): Promise<Member[]> {
        const response = await fetch('/api/members');
        const data: MembersResponse = await response.json();
        if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to load members');
        }
        return data.members;
}



export async function deleteMember(id: number): Promise<void> {
        const res = await fetch(`/api/members/${id}`, {
                method: 'DELETE'
        });
        if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error((payload).error || 'Failed to delete member');
        }
}



