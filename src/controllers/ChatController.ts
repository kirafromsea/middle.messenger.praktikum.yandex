import ProfileAPI from '../api-services/ProfileAPI';
import Store from '../classes/Store';
import ChatAPI from '../api-services/ChatAPI';
import {PutChatType} from '../api-services/types';

class ChatController {
  public store: typeof Store = Store;

  public async getChats() {
    let chats = null;
    try {
      this.store.set('error', null);
      const {status, response} = await ChatAPI.chats();
      console.log('=getChats', status, response);
      if (status === 200) {
        chats = JSON.parse(response);
        this.store.set('chats', chats);
      } else {
        this.store.set('chats', null);
        this.store.set('error', {code: status, response});
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
      console.log('=chat controller data', data);
      const {status, response} = await ChatAPI.postChat(data);
      if (status === 200) {
        //this.store.set('chats', response);
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

  public async getUser(userId: number) {
    try {
      this.store.set('error', null);
      const {status, response} = await ProfileAPI.getProfile(userId);
      if (status === 200) {
        await this.store.setResetState();
      } else {
        this.store.set('error', {code: status, response});
      }
    } catch (e) {
      console.log(e);
      this.store.set('error', {code: 500});
    }
  }
}

export default new ChatController();
