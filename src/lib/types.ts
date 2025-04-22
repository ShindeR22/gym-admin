export type Member = {
        id: number;
        initials: string;
        name: string;
        email: string;
        membership: 'Premium' | 'Standard';
        joined: string;
};

export type Activity = {
        id: number;
        icon: 'user-plus' | 'check-circle' | 'dollar-sign' | 'x-circle' | 'settings';
        title: string;
        subtitle: string;
        timeAgo: string;
};
