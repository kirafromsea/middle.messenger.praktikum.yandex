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
    avatar?: string | null;
    created_by: number;
    unread_count: number;
    last_message: MessageType[];
    users: {
        [k: string]: ChatUserType;
    }
}

export type ChatsType = ChatItemType[];

export type ChatsInfoType = {
    profile: UserProfileType;
    chats: ChatsType;
}

export interface ChatMessageType {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
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
