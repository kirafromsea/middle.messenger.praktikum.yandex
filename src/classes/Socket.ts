import EventBus from './EventBus';
import {socketUrl} from '../config';

export enum SocketEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export default class SebSocket extends EventBus {
  private socket: WebSocket | null = null;

  private readonly url: string = socketUrl;

  private pingInterval = 0;

  private timer: ReturnType<typeof setInterval> = setInterval(() => ({}));

  constructor(url: string) {
    super();

    this.url = `${socketUrl}/${url}`;
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);
    this.setupPing();
    return new Promise((resolve) => {
      this.on(SocketEvents.Connected, () => {
        resolve();
      });
    });
  }

  public send(data: unknown, timeout = 500) {
    if (!this.socket) throw new Error('Socket is not connected');

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else if (this.socket.readyState === WebSocket.CONNECTING) {
      setTimeout(() => {
        this.send(data, timeout); // Retry after the specified timeout
      }, timeout);
    } else {
      console.error(
        'WebSocket connection failed to open within the timeout period',
      );
      throw new Error('Socket is not connected');
    }
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = 5000;
    this.timer = setInterval(() => {
      this.send({type: 'ping'});
    }, this.pingInterval);

    this.on(SocketEvents.Close, () => {
      clearInterval(this.timer);
      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => this.emit(SocketEvents.Connected));
    socket.addEventListener('close', () => this.emit(SocketEvents.Close));
    socket.addEventListener('error', (e) => this.emit(SocketEvents.Error, e));
    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (data instanceof SyntaxError) {
        console.log('Couldn\'t send message');
      }

      if (data.type && data.type === 'pong') return;
      this.emit(SocketEvents.Message, data);
    });
  }
}
