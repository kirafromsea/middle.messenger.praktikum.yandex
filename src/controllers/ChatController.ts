import ProfileAPI from '../api-services/ProfileAPI';
import Store from '../classes/Store';
import ChatAPI from '../api-services/ChatAPI';
import {PutChatType} from '../api-services/types';
import {ChatItemType, ChatUserType} from '../types/chats';
import {baseUrl} from '../config';
import UsersController from './UsersController';
import MessagesController from './MessagesController';

type UserToObjectType = {
  [k: string]: ChatUserType;
}
const userArrayToObject = (users: ChatUserType[]) => {
  const usersObject: UserToObjectType = {};

  users?.forEach((user) => {
    const userId = `user_${user.id}`;
    if (!usersObject[userId]) {
      usersObject[userId] = user;
    }
  });

  return usersObject;
};

class ChatController {
  public store: typeof Store = Store;

  public async getToken(id: number) {
    try {
      const {status, response} = await ChatAPI.getToken(id);

      if (status === 200) {
        return JSON.parse(response).token;
      }
    } catch (error) {
      console.log('error in getToken method', error);
      this.store.set('error', {error, code: 400});
    }
    return null;
  }

  public async getChats() {
    const chats: ChatItemType[] = [];
    try {
      this.store.set('error', null);
      this.store.set('methodLoading', true);
      const {status, response} = await ChatAPI.chats();
      if (status === 200) {
        /**
         * TODO оптимизировать. Возможно подгружать токен и сообщения после отрисовки чатов.
         * Избавиться от лишних ререндеров при подгрузке сообщений чатов.
         */
        for (const item of JSON.parse(response)) {
          const token = await this.getToken(item.id);

          const users = await this.getUsers(item.id);
          chats.push({
            created_by: item.created_by,
            id: item.id,
            title: item.title,
            unread_count: item.unread_count,
            avatar: item.avatar ? `${baseUrl}/resources${item.avatar}` : null,
            last_message: !item.last_message ? [] : [item.last_message],
            users: userArrayToObject(users),
          });

          await MessagesController.connect(item.id, token);
        }

        this.store.set('chats', chats);
        this.store.set('methodLoading', false);
      } else {
        this.store.set('chats', null);
        this.store.set('error', {code: status, response});
        this.store.set('methodLoading', true);
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return chats;
  }

  public async addChat(data: PutChatType) {
    try {
      this.store.set('error', null);
      const {status, response} = await ChatAPI.postChat(data);
      if (status === 200) {
        this.store.set('chats', response);
        return response;
      }
      this.store.set('chats', null);
      this.store.set('error', {code: status, response});
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return null;
  }

  public async deleteChat(chatId: number) {
    try {
      this.store.set('error', null);
      const {status, response} = await ChatAPI.deleteChat(chatId);
      if (status === 200) {
        return true;
      }
      this.store.set('chats', null);
      this.store.set('error', {code: status, response});
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return false;
  }

  public async getUser(userId: number) {
    try {
      this.store.set('error', null);
      const {status, response} = await ProfileAPI.getProfile(userId);
      if (status === 200) {
        await this.store.setResetState();
        return JSON.parse(response);
      }
      this.store.set('error', {code: status, response});
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return [];
  }

  public async updateAvatar(data: FormData) {
    try {
      this.store.set('error', null);
      const {status, response} = await ChatAPI.putAvatar(data);
      if (status === 200) {
        const newChatInfo = JSON.parse(response);
        newChatInfo.avatar = `${baseUrl}/resources${newChatInfo.avatar}`;
        const state = this.store.getState();
        const updateChats = state.chats.map((item: ChatItemType) => ({
          ...item,
          avatar: item.id === newChatInfo.id ? newChatInfo.avatar : item.avatar,
        }));
        this.store.set('chats', updateChats);
        this.store.set('activeChat', {
          ...state.activeChat,
          avatar: newChatInfo.avatar,
        });
        return newChatInfo;
      }
      this.store.set('error', {code: status, response});
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return null;
  }

  public async getUsers(chatId: number): Promise<any> {
    try {
      this.store.set('error', null);
      const {status, response} = await ChatAPI.getUsers(chatId);
      if (status === 200) {
        return JSON.parse(response).map((item: ChatUserType) => ({
          ...item,
          avatar: item.avatar ? `${baseUrl}/resources${item.avatar}` : null,
        }));
      }
      this.store.set('error', {code: status, response});
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return null;
  }

  public async addUserInChat(data: {login: string}): Promise<any> {
    try {
      this.store.set('error', null);
      const searchResult: ChatUserType[] = await UsersController.searchUser(data.login);
      const chatId = this.store.getState().activeChat?.id;

      if (searchResult[0] && chatId) {
        const {status, response} = await ChatAPI.putUsers({
          users: [searchResult[0].id],
          chatId,
        });

        if (status === 200) {
          return true;
        }
        this.store.set('error', {code: status, response});
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return null;
  }

  public async deleteUserInChat(id: number) {
    try {
      const chatId = this.store.getState().activeChat?.id;
      if (chatId) {
        const {status, response} = await ChatAPI.deleteUser({
          users: [id],
          chatId,
        });
        if (status === 200) {
          return true;
        }
        this.store.set('error', {code: status, response});
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }

    return false;
  }
}

export default new ChatController();
