import Block from '../../classes/Block';
import Store from '../../classes/Store';
import ChatController from '../../controllers/ChatController';
import usersListTmpl from './usersList.tmpl';
import {ChatUserType} from '../../types/chats';

interface UsersListProps {
  users: ChatUserType[];
}
class UsersList extends Block {
  constructor(props: UsersListProps) {
    super('div', {...props});
  }

  async init() {
    const adminUser = this.props.users.filter((item: ChatUserType) => item.role === 'admin')[0];
    const canDeleteUser = adminUser?.id === Store.getState().user?.id;

    this.setProps({
      usersList: this.props.users.map(
        (item: ChatUserType) => (
          {
            ...item,
            display_name: item.display_name || item.first_name || item.login,
            isAdmin: item.role === 'admin',
            canDelete: canDeleteUser && item.role !== 'admin',
          }),
      ),
    });

    this.setProps({
      events: {
        click: async (e: Event) => {
          const element = e.target as HTMLElement;
          if (element.classList.contains('user-list_delete-button')) {
            const userId = Number(element.getAttribute('data'));
            const user = this.props.users.filter((item: ChatUserType) => item.id === userId)[0];
            if (user && user.role !== 'admin') {
              const resultDelete = await ChatController.deleteUserInChat(userId);

              if (resultDelete) {
                this.setProps({
                  usersList: this.props.usersList.filter((item: ChatUserType) => item.id !== userId),
                });
              }
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile({template: usersListTmpl, context: this.props});
  }
}

export default UsersList;
