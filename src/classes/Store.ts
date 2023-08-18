import {set} from '../utils/object';
import EventBus from './EventBus';
import {ChatsType, ChatItemType, ChatMessageType} from '../types/chats';

const storeEventsUpdated = 'updated';

export type StoreState = {
    auth: boolean;
    user: null | Record<string, string | number>;
    isLoading: boolean;
    getPage: string;
    chats: ChatsType;
    error: null | {code: number; response: unknown};
    activeChat: ChatItemType | null;
    messages: Record<number, ChatMessageType[]>;
};

const initialStoreState: StoreState = {
  auth: false,
  user: null,
  isLoading: false,
  getPage: '/',
  chats: [],
  error: null,
  activeChat: null,
  messages: {},
};

class Store extends EventBus {
  private state = {...initialStoreState};

  public getState(): StoreState {
    return this.state;
  }

  public set(path: string, value: unknown): void {
    if (!path || path.trim() === '') {
      return;
    }
    try {
      set(this.state, path, value);
      console.log('=after sets state', this.state);
      this.emit(storeEventsUpdated);
    } catch (e) {
      console.log(e);
    }
  }

  public setResetState(): void {
    try {
      this.state = {...initialStoreState};
      this.emit(storeEventsUpdated);
    } catch (error) {
      console.log('=setResetStore catch', error);
    }
  }
}

export default new Store();
