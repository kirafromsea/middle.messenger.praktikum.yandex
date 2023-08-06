import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
import {chatApi, headersJson} from './api-urls';
import {PutChatType, PutChatUsersType} from './types';

class ChatAPIClass {
  public http = new HTTPTransport(`${baseUrl}/chats`);

  chats(): Promise<any> {
    return this.http.get({
      url: chatApi.chats,
    });
  }

  postChat(data: PutChatType): Promise<any> {
    return this.http.post({
      url: chatApi.chats,
      options: {
        data,
        ...headersJson,
      },
    });
  }

  deleteChat(chatId: number): Promise<any> {
    return this.http.delete({
      url: chatApi.chats,
      options: {
        data: {
          chatId,
        },
        ...headersJson,
      },
    });
  }

  putAvatar(data: FormData): Promise<any> {
    return this.http.put({
      url: chatApi.chatAvatar,
      options: {
        data,
        isFormData: true,
      },
    });
  }

  getUsers(chatId: number): Promise<any> {
    return this.http.get({
      url: chatApi.users.replace(':id', String(chatId)),
      options: {},
    });
  }

  putUsers(data: PutChatUsersType): Promise<any> {
    return this.http.put({
      url: chatApi.addUser,
      options: {
        data,
        ...headersJson,
      },
    });
  }
}

const ChatAPI = new ChatAPIClass();

export default ChatAPI;
