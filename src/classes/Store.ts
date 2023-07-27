import {set} from '../utils/object';
import EventBus from './EventBus';

const storeEventsUpdated = 'updated';

export type ChatType = Record<string, number | string | unknown>

export type StoreState = {
    auth: boolean,
    user: null | Record<string, string | number>,
    isLoading: false,
    getPage: string,
    chats: ChatType[],
    error: null | {code: number; response: unknown},
    currentChat: {
        isLoading: boolean,
        isLoadingOldMsg: boolean,
        scroll: number,
        chat: null | ChatType,
        messages: ChatType[] | null,
    },
};

const initialStoreState: StoreState = {
  auth: false,
  user: null,
  isLoading: false,
  getPage: '/',
  chats: [],
  error: null,
  currentChat: {
    isLoading: false,
    isLoadingOldMsg: false,
    scroll: 0,
    chat: null,
    messages: null,
  },
};

class Store extends EventBus {
  private state = {...initialStoreState};

  public getState(): StoreState {
    return this.state;
  }

  public getStateItem(itemName) {
    return this.state[itemName] || null;
  }

  public set(path: string, value: unknown): void {
    if (!path || path.trim() === '') {
      return;
    }
    try {
      set(this.state, path, value);
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
