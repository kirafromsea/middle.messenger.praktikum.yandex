import Block from '../../classes/Block';
import ChatController from '../../controllers/ChatController';
import Button from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import Form from '../../ui-components/Form/form';
import {ChatItemType, ChatUserType} from '../../types/chats';
import Avatar from '../../ui-components/Avatar/avatar';
import {DEFAULT_AVATAR} from '../../utils/constants';
import UsersList from '../UsersList/usersList';
import settingsChatModalTmpl from './settingsChatModal.tmpl';

type ChatModalProps = {
  onClose: () => void,
  activeChat: ChatItemType;
  afterChange: () => void;
}

class SettingsChatModal extends Block {
  constructor(props: ChatModalProps) {
    super({...props});
  }

  async init() {
    /** Close button */
    const users = await ChatController.getUsers(this.props.activeChat.id);
    const onClose = this.getProps('onClose');
    this.children.closeButton = new Button({
      title: 'X',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => {
          if (onClose) {
            onClose();
          }
        },
      },
    });

    /** Avatar settings */
    this.children.avatar = new Avatar({
      url: this.props.activeChat?.avatar || DEFAULT_AVATAR,
    });
    this.children.changeAvatar = new Input({
      name: 'avatar',
      type: 'file',
      placeholder: 'Update avatar',
      required: false,
      value: this.getProps('url'),
      events: {
        onChange: async (event) => {
          if (event) {
            await this.updateAvatar(event);
            this.props.afterChange();
          }
        },
      },
    });

    /** Users settings */
    const addUserButton = new Button({
      title: '+ Add user',
      uiType: 'third',
      type: 'submit',
      events: {
        onClick: async () => {
          if (this.children.usersList) {
            const users = await ChatController.getUsers(this.props.activeChat.id);
            this.usersList(users);
            this.setProps({users});
          }
        },
      },
    });

    const addUserControl = new Input({
      name: 'login',
      type: 'text',
      value: '',
      placeholder: 'User name',
      required: true,
      description: '',
    });

    this.children.addUser = new Form({
      controls: [addUserControl],
      buttons: [addUserButton],
      controller: ChatController.addUserInChat.bind(ChatController),
      formClassName: 'add-new-user',
    });

    /** Delete */
    this.children.deleteChat = new Button({
      title: 'Delete chat',
      uiType: 'danger',
      type: 'button',
      events: {
        onClick: () => {
          this.deleteChat();
        },
      },
    });

    this.usersList(users);

    this.setProps({
      users,
    });
  }

  usersList(users: ChatUserType[]) {
    this.children.usersList = new UsersList({
      users,
    });
  }

  async updateAvatar(e: Event) {
    const data = new FormData();
    const elem = e.target as HTMLInputElement;
    if (elem?.files) {
      data.append('avatar', elem?.files[0]);
      data.append('chatId', this.props.activeChat.id);
    }

    const result = await ChatController.updateAvatar(data);

    if (result) {
      this.setProps({profile: result});
      (this.children.avatar as Block).setProps({url: result?.avatar});
    }
  }

  async deleteChat() {
    const result = await ChatController.deleteChat(this.props.activeChat.id);
    if (result) {
      this.props.afterChange();
    }
  }

  render() {
    return this.compile({template: settingsChatModalTmpl, context: {...this.props}});
  }
}

export default SettingsChatModal;
