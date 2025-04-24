

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
        member: { id: string };
}
export async function createMember(memberFormData: Partial<MemberFormData>): Promise<MemberResponse> {
        const response = await fetch('/api/add', {
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




