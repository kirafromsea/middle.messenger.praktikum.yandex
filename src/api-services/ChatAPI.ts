import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
import {chatApi} from './api-urls';
import {PutChatType} from './types';

class ChatAPIClass {
  public http = new HTTPTransport(`${baseUrl}/chats`);

  chats(): Promise<any> {
    return this.http.get({
      url: chatApi.chats
    });
  }

  postChat(data: PutChatType): Promise<any> {
    return this.http.post({
      url: chatApi.chats,
      options: {
        data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    });
  }
}

const ChatAPI = new ChatAPIClass();

export default ChatAPI;
