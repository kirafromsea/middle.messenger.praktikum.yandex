// TODO разделить на компоненты, когда будет время после дедлайнов
import Block from '../../classes/Block';
import Store from '../../classes/Store';
import Button from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import {ChatItem} from '../../ui-components/index';
import MessageItem from '../../ui-components/MessageItem/messageItem';
import ChatController from '../../controllers/ChatController';
import {Paths} from '../../utils/constants';
import Avatar from '../../ui-components/Avatar/avatar';
import chatTmpl from './chat.tmpl';
import AddChatModal from '../../components/AddChatModal/addChatModal';
import {ChatsType, ChatItemType, MessageType} from '../../types/chats';
import SettingsChatModal from '../../components/SettingsChatModal/settingsChatModal';

type ModalsSettingsNameProps = 'addChatModal' | 'settingsChatModal';
class ChatPage extends Block {
  constructor() {
    super('div', {
      chats: [],
      activeChat: null,
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
        onClick: () => this.toggleModal('addChatModal'),
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
      formClassName: 'chat-bottom chat-bottom_message',
      controller: ChatController.setMessage.bind(ChatController),
    });

    this.chatsList(chats);

    // Modals
    this.children.addChatModal = new AddChatModal({
      onClose: () => { this.toggleModal('addChatModal'); },
      onSubmit: async () => {
        const newChats = await ChatController.getChats();
        this.chatsList(newChats);
        this.setProps({chats: newChats});
      },
    });

    this.children.settingsChatButton = new Button({
      title: 'Settings',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => {
          this.toggleModal('settingsChatModal');
        },
      },
    });
    this.setProps({
      chats,
      activeChat: null,
    });
  }

  toggleModal(modalName: ModalsSettingsNameProps, isOpen?: boolean) {
    const modal = (this.children[modalName] as Block)?.getContent();
    if (modal && typeof isOpen === 'boolean') {
      modal.classList.toggle('modal-shadow--hide', isOpen);
    } else if (modal) {
      modal.classList.toggle('modal-shadow--hide');
    }
  }

  changeChat(chatId: number) {
    const activeChat = this.props.chats.filter((item: ChatItemType) => item.id === chatId)[0];
    const state = Store.getState();
    this.children.messageList = activeChat.last_messages.map((message: MessageType) => new MessageItem({
      avatar: message.user.avatar || '',
      message: message.content,
      date: message.time.trim(),
      type: message.user.login === state.user?.login ? 'self' : 'companion',
    }));

    this.children.activeChatAvatar = this.setAvatar(activeChat.avatar);
    Store.set('activeChat', activeChat);

    if (Array.isArray(this.children.chatsList)) {
      this.children.chatsList.forEach((item) => {
        item.setProps({isActive: item.getProps('idChat') === activeChat.id});
      });
    }

    this.chatSettingsModal(activeChat);

    this.setProps({
      ...this.props,
      activeChat,
    });
  }

  chatsList(chats: ChatsType) {
    /*
    idChat: number;
  isActive?: boolean;
  events?: {
    [key: string]: (chatId: number) => void
  }
     */
    this.children.chatsList = chats.map((item) => new ChatItem({
      ...item,
      idChat: item.id,
      isActive: false, // TODO можно в будущем сделать по умолчанию активным первый чат из списка
      events: {
        onClick: (chatId) => {
          this.changeChat(chatId);
        },
      },
    }));
  }

  setAvatar(url: string) {
    return new Avatar({
      url: url || null,
      // controller: ProfileController.updateAvatar.bind(ProfileController),
    });
  }

  sendMessage(content: string) {
    console.log('=content', content);
  }

  chatSettingsModal(activeChat: ChatItemType) {
    this.children.settingsChatModal = new SettingsChatModal({
      activeChat,
      onClose: () => {this.toggleModal('settingsChatModal')},
      afterChange: async () => {
        const newChats = await ChatController.getChats();
        this.chatsList(newChats);
        await this.setProps({chats: newChats});
        this.toggleModal('settingsChatModal', true);
      },
    });
  }

  render() {
    return this.compile({template: chatTmpl, context: {...this.props}});
  }
}

export default ChatPage;
