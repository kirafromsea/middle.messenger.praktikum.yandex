import Block from '../../classes/Block';
import ChatController from '../../controllers/ChatController';
import usersListTmpl from './usersList.tmpl';
import {ChatUserType} from '../../types/chats';

interface UsersListProps {
  chatId: number;
}
class UsersList extends Block {
  constructor(props: UsersListProps) {
    super('div', {...props});
  }

  async init() {
    const users = await ChatController.getUsers(this.props.chatId);
    this.setProps({usersList: users.map((item: ChatUserType) => ({...item, display_name: item.display_name || item.first_name || item.login, isAdmin: item.role === 'admin'}))});
  }

  deleteUser() {}

  render() {
    return this.compile({template: usersListTmpl, context: this.props});
  }
}

export default UsersList;
