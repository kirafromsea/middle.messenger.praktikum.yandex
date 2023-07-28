// TODO разделить на компоненты, когда будет время после дедлайнов
import chatInfo from '../../../public/chats';
import Block from '../../classes/Block';
import Store from '../../classes/Store';
import Button from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import {ChatItem} from '../../ui-components/index';
import MessageItem from '../../ui-components/MessageItem/messageItem';
import ChatController from '../../controllers/ChatController';
import {MESSAGE_TYPE_SELF, Paths} from '../../utils/constants';
import {ModalsSettingsNameProps} from './modalsSettings';
import chatTmpl from './chat.tmpl';
import ChatModal from './chatModal';
import {ChatItemType, ChatsType} from "../../types/chats";
import chatItem from "../../ui-components/Chatitem/chatItem";

class ChatPage extends Block<{chats: ChatsType; activeChat: ChatItemType | null}> {
  constructor() {
    super('div', {
      chats: [],
      activeChat: null
    });
  }

  async init() {
    const chats: ChatsType = await ChatController.getChats();

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

    this.children.buttonNewChat = new Button({
      title: 'Add chat',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => this.toggleModal('addChat'),
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

    console.log('=Store.getState().chats', Store.getState().chats);
    this.children.chatsList = Store.getState().chats.map((item) => new ChatItem({
      ...item,
      events: {
        onClick: (chatId) => {
          this.changeChat(chatId);
        },
      },
    }));
    // this.changeChat(this.getProps('activeChat'));

    // Modals
    this.children.addChatModal = new ChatModal({
      modalName: 'addChat',
      controller: ChatController.addChat.bind(ChatController),
      onClose: () => { this.toggleModal('addChat'); },
      onSubmit: () => {
        console.log('=submit add chat');
      },
    });

    this.setProps({
      chats,
      activeChat: null
    });
  }

  toggleModal(modalName: ModalsSettingsNameProps) {
    const name = `${modalName}Modal`;
    const modal = (this.children[name] as Block).getContent();
    if (modal) {
      modal.classList.toggle('modal-shadow--hide');
      //modal.setAttribute('style', '{display: inline-block}');
    }
  }

  changeChat(chatId: number) {
    const activeChat = this.props.chats.filter((item) => item.id === chatId)[0];
    /*
    if (activeChat?.messages?.length > 0) {
      this.children.messageList = activeChat.messages.map((message) => new MessageItem({
        avatar: (message.author === MESSAGE_TYPE_SELF ? profile.avatar : activeChat.avatar) || '',
        message: message.message,
        date: message.date,
        type: message.author === 'self' ? message.author : 'companion',
      }));
    }
    this.setProps({
      ...this.props,
      activeChat
    });
     */
  }

  render() {
    console.log('=render', this.props, this.children);
    return this.compile({template: chatTmpl, context: {...this.props}});
  }
}

export default ChatPage;
