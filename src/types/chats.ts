export interface UserProfileType {
    login: string;
    email: string;
    password: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    avatar?: string;
}

export interface MessageType {
    author: string;
    date: string;
    message: string;
}

export interface ChatItemType {
    displayName: string;
    login: string;
    avatar?: string;
    messages: MessageType[];
}

export type ChatsType = ChatItemType[];
