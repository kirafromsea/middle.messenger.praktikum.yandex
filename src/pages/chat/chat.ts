// TODO разделить на компоненты, когда будет время после дедлайнов
import Block from '../../classes/Block/Block';
import Store, {StoreState} from '../../classes/Store';
import withStore from '../../utils/withStore';
import {Paths} from '../../utils/constants';
import {ChatItemType, ChatMessageType, ChatsType} from '../../types/chats';
import Button from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import ChatItem from '../../ui-components/Chatitem/chatItem';
import MessageItem from '../../ui-components/MessageItem/messageItem';
import Avatar from '../../ui-components/Avatar/avatar';
import SettingsChatModal from '../../components/SettingsChatModal/settingsChatModal';
import AddChatModal from '../../components/AddChatModal/addChatModal';
import ChatController from '../../controllers/ChatController';
import MessagesController from '../../controllers/MessagesController';
import chatTmpl from './chat.tmpl';

type ModalsSettingsNameProps = 'addChatModal' | 'settingsChatModal';

type ChatPageProps = {
  messages?: ChatMessageType[];
  pageLoading?: boolean;
  user?: null | Record<string, string | number>;
  chats?: ChatsType;
  methodLoading?: boolean;
  error?: null | {code: number; response: unknown};
  activeChat?: ChatItemType | null;
}

class ChatPage extends Block {
  constructor(initProps: ChatPageProps) {
    super({
      ...initProps,
    });
    Store.set('pageLoading', true);
  }

  async init() {
    await ChatController.getChats();

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
    });

    // Messages
    this.children.messageForm = new Form({
      controls: [controlsMessage],
      buttons: [buttonMessage],
      formClassName: 'chat-bottom chat-bottom_message',
      controller: MessagesController.sendMessage.bind(MessagesController),
      clearAfterSubmit: true,
    });

    // Modals
    this.children.addChatModal = new AddChatModal({
      onClose: () => { this.toggleModal('addChatModal'); },
      onSubmit: async () => {
        await ChatController.getChats();
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
    this.chatsList(this.props.chats, this.props.activeChat?.id);
    Store.set('pageLoading', false);
  }

  componentDidUpdate(oldProps?: ChatPageProps, newProps?: ChatPageProps) {
    if (newProps?.chats && (oldProps?.chats !== newProps.chats)) {
      this.chatsList(newProps.chats, newProps.activeChat?.id);
    }
    if (oldProps?.messages !== newProps?.messages && this.props.activeChat) {
      this.messageList(this.props.activeChat);
    }
    return true;
  }

  toggleModal(modalName: ModalsSettingsNameProps, isOpen?: boolean) {
    const modal = (this.children[modalName] as Block)?.getContent();
    if (modal && typeof isOpen === 'boolean') {
      modal.classList.toggle('modal-shadow--hide', isOpen);
    } else if (modal) {
      modal.classList.toggle('modal-shadow--hide');
    }
  }

  messageList(activeChat: ChatItemType) {
    this.children.messageList = this.props.messages.filter((message: ChatMessageType) => message.type === 'message')
      .map((message: ChatMessageType) => new MessageItem({
        avatar: activeChat?.users[`user_${message?.user_id}`]?.avatar || '',
        message: message.content,
        date: message.time.trim(),
        type: message.user_id === this.props.user?.id ? 'self' : 'companion',
      }));
  }

  changeChat(chatId: number) {
    let activeChat: ChatItemType;
    this.props.chats.forEach((item: ChatItemType) => {
      if (item.id === chatId) {
        activeChat = {...item};
        this.chatSettingsModal(activeChat);
        this.children.activeChatAvatar = this.setAvatar(activeChat.avatar || null);
        this.chatsList(this.props.chats, activeChat.id);

        Store.set('activeChat', activeChat);
      }
    });
  }

  chatsList(chats: ChatItemType[], activeChatId?: number) {
    this.children.chatsList = chats.map((item: ChatItemType) => new ChatItem({
      ...item,
      idChat: item.id,
      isActive: item.id === activeChatId,
      events: {
        onClick: (chatId: number) => {
          this.changeChat(chatId);
        },
      },
    }));
  }

  setAvatar(url: string | null) {
    return new Avatar({
      url,
    });
  }

  chatSettingsModal(activeChat: ChatItemType) {
    this.children.settingsChatModal = new SettingsChatModal({
      activeChat,
      onClose: () => { this.toggleModal('settingsChatModal'); },
      afterChange: async () => {
        const newChats = await ChatController.getChats();
        this.chatsList(newChats, activeChat.id);
        await this.setProps({chats: newChats});
        this.toggleModal('settingsChatModal', true);
      },
    });
  }

  render() {
    return this.compile({template: chatTmpl, context: {...this.props}});
  }
}

const withMessages = withStore((state: StoreState) => {
  const activeChatId = state.activeChat?.id;
  const messages = state.messages && activeChatId ? state.messages[activeChatId] : [];
  const chats = state.chats || [];
  try {
    return {
      user: state.user,
      error: state.error,
      messages,
      chats,
      activeChat: state.activeChat,
      pageLoading: state.pageLoading,
      methodLoading: state.methodLoading,
    };
  } catch {
    return {
      messages: [], chats: [], pageLoading: false, methodLoading: false,
    };
  }
});

export default withMessages(ChatPage);
