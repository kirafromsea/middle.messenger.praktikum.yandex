import HTTPTransport from './HTTPTransport';
import {baseUrl} from '../config';
// import {profileApi, headersJson} from './api-urls';
// import {SignupDataType} from './types';

class ChatAPIClass {
  public http = new HTTPTransport(`${baseUrl}/user`);
}

const ChatAPI = new ChatAPIClass();

export default ChatAPI;
