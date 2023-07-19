import {set} from '../utils/object';
import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'updated'
}

export type ChatType = Record<string, number | string | unknown>

export type StoreState = {
    auth: boolean,
    user: null | Record<string, string | number>,
    isLoading: false,
    getPage: string,
    chats: ChatType[],
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
    currentChat: {
        isLoading: false,
        isLoadingOldMsg: false,
        scroll: 0,
        chat: null,
        messages: null,
    }
}
class Store extends EventBus {
    private state = initialStoreState;

    public getState(): StoreState {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        try {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }

    public setResetState(): void {
        try {
            this.state = initialStoreState;
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Store();