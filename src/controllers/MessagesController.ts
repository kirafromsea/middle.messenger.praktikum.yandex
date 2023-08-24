import Store from '../classes/Store';
import Socket, {SocketEvents} from '../classes/Socket';
import {ChatMessageType} from '../types/chats';

const RECONNECT_LIMIT = 5;

class MessagesController {
  public store: typeof Store = Store;

  private token: string | null = null;

  private id: number | null = null;

  private reconnectCount: number = 0;

  private sockets: Map<number, Socket> = new Map();

  private subscribe({transport, id}: {transport: Socket, id: number}) {
    transport.on(SocketEvents.Message, (messages) => this.onMessage({id, messages}));
    transport.on(SocketEvents.Close, () => this.onClose(id));
  }

  private onMessage({id, messages}: {id: number, messages: ChatMessageType | ChatMessageType[]}) {
    let newMessages: ChatMessageType[] = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (this.store.getState().messages || {})[id] || [];

    newMessages = [...currentMessages, ...newMessages];

    this.store.set(`messages.${id}`, newMessages);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private reconnect() {
    if (this.id && this.token) {
      return this.connect(this.id, this.token);
    }

    return null;
  }

  public async connect(id: number, token: string) {
    if (this.sockets.has(id)) return;
    this.id = id;
    this.token = token;

    const userId = this.store.getState().user?.id;
    if (!userId) return;

    const webSocket = new Socket(`${userId}/${id}/${token}`);

    this.sockets.set(id, webSocket);
    await webSocket.connect();
    this.subscribe({transport: webSocket, id});
    this.getMessages(id, 0);
  }

  public getMessages(id: number, content: number) {
    const socket = this.sockets.get(id);

    if (!socket) throw new Error(`Chat ${id} is not connected`);

    socket.send({type: 'get old', content});
  }

  public async sendMessage({message}: {message: string}) {
    const chatId = this.store.getState().activeChat?.id;
    if (!chatId) return;

    let socket = this.sockets.get(chatId);

    while (!socket && this.reconnectCount <= RECONNECT_LIMIT) {
      await this.reconnect();
      socket = this.sockets.get(chatId);
    }
    if (!socket) {
      throw new Error(`Chat ${this.id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }
}

export default new MessagesController();
