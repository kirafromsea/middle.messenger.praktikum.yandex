import {MESSAGE_TYPE_COMPANION, MESSAGE_TYPE_SELF} from '../utils/constants';

export interface UserProfileType {
    login: string;
    email: string;
    password: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    avatar?: string;
    //[k: string]: string | undefined;
}

export interface MessageType {
    author: typeof MESSAGE_TYPE_SELF | typeof MESSAGE_TYPE_COMPANION;
    date: string;
    message: string;
}

export interface ChatItemType {
    display_name: string;
    login: string | null;
    avatar?: string;
    messages: MessageType[];
}

export type ChatsType = ChatItemType[];

export type ChatsInfoType = {
    profile: UserProfileType;
    chats: ChatsType;
}
