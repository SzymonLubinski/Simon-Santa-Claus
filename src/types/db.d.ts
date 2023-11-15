
interface User {
    name: string;
    email: string;
    image: string;
    id: string;
    groupIds?: string[];
}

interface UserWithPassword extends User{
    password: string;
}

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: number;
    messageType: 'image' | 'video' | 'text';
    receiverId?: string;
}

interface externalFriend {
    name: string;
    id: string;
    email: string;
}
interface RawGroupType {
    externalFriends: string[],
    loggedFriends: string[],
    creatorId: string;
    name: string,
    minBudget: number,
    maxBudget: number,
    giftDay: string;
}
interface GroupType {
    externalFriends: externalFriend[];
    loggedFriends: User[];
    creatorId: string;
    name: string;
    minBudget: number;
    maxBudget: number;
    id: string;
    giftDay: string;
}

interface DrawMember {
    name: string;
    id: string;
}

interface DrawResult extends DrawMember{
    endowed: DrawMember;
}