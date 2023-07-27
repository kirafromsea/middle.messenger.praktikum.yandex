import chatInfo from '../../../public/chats';
import Block from '../../classes/Block';
import Button from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import {ChatItem} from '../../ui-components/index';
import MessageItem from '../../ui-components/MessageItem/messageItem';
import {MESSAGE_TYPE_SELF, Paths} from '../../utils/constants';
import chatTmpl from './chat.tmpl';
import AuthController from '../../controllers/AuthController';

class ChatPage extends Block {
  constructor() {
    super('div', {
      activeChat: chatInfo.chats.length > 0 ? chatInfo.chats[0].login : null,
    });
  }

  init() {
    const controlsSearch = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Search',
    });

    const buttonSearch = new Button({
      title: 'Search',
      uiType: 'third',
      type: 'submit',
      events: {
        onClick: () => {
          console.log('=search');
        },
      },
    });

    this.children.searchForm = new Form({
      controls: [controlsSearch],
      buttons: [buttonSearch],
      formClassName: 'chat-header',
    });

    this.children.profileButton = new Button({
      title: 'Profile',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => {
          window.location.href = Paths.Settings;
        },
      },
    });

    const controlsMessage = new Input({
      name: 'message',
      type: 'text',
      placeholder: 'Message',
      required: true,
    });

    const buttonMessage = new Button({
      title: 'Send',
      uiType: 'third',
      type: 'submit',
      events: {
        onClick: () => {
          console.log('=message');
        },
      },
    });

    this.children.messageForm = new Form({
      controls: [controlsMessage],
      buttons: [buttonMessage],
      formClassName: 'chat-bottom',
    });

    const {chats} = chatInfo;
    this.children.chatsList = chats.map((item) => new ChatItem({
      display_name: item.display_name,
      login: item.login || null,
      avatar: item.avatar || '',
      events: {
        onClick: (login) => {
          this.changeChat(login);
          this.setProps({activeChat: login});
        },
      },
    }));
    this.changeChat(this.getProps('activeChat'));
  }

  changeChat(login?: string | null) {
    const {chats, profile} = chatInfo;
    if (login && login.trim() !== '') {
      const activeChat = chats.filter((item) => item.login === login)[0];
      if (activeChat?.messages?.length > 0) {
        this.children.messageList = activeChat.messages.map((message) => new MessageItem({
          avatar: (message.author === MESSAGE_TYPE_SELF ? profile.avatar : activeChat.avatar) || '',
          message: message.message,
          date: message.date,
          type: message.author === 'self' ? message.author : 'companion',
        }));
      }
    }
  }

  render() {
    return this.compile({template: chatTmpl, context: {...this.props}});
  }
}

export default ChatPage;
