/* eslint-disable @typescript-eslint/indent */
export interface Link {
    id: string;
    description: string;
    url: string;
    votes: Vote[];
    postedBy: User;
    createdAt: string;
}

export interface Vote {
    id: string;
    user: User;
}

export interface User {
    id: string;
    name: string;
}
