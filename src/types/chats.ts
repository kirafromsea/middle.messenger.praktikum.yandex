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

export interface MessageUserProfileType {
    first_name: string;
    second_name: string;
    avatar: string;
    login: string;
}

export interface MessageType {
    user: MessageUserProfileType;
    time: string;
    content: string;
}

export interface ChatItemType {
    id: number;
    title: string;
    avatar?: string;
    created_by: number;
    unread_count: number;
    last_messages: MessageType[];
}

export type ChatsType = ChatItemType[];

export type ChatsInfoType = {
    profile: UserProfileType;
    chats: ChatsType;
}

export type ChatUserType = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    role: string; // 'admin' | '' TODO вычислить роли и добавить их в качестве типа
}
