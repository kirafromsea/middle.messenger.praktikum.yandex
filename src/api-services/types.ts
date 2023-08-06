export type SignupDataType = {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    phone: string,
    password: string,
};

export type LoginDataType = {
    login: string,
    password: string,
};

export type PutChatType = {
    title: string;
}

export type PostMessageType = {
    message: string;
}

export type PutChatUsersType = {
    users: number[],
    chatId: number
};
