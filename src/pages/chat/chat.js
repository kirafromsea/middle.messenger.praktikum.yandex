import Handlebars from 'handlebars';
import {chatTmpl} from './chat.tmpl.js';
import {Button, ChatItem} from '../../components';

const buttonSearch = Button({
  title: 'Search',
  onClick: '',
  uiType: 'third',
  type: 'button'
});

const profileButton = Button({
  title: 'Profile',
  onClick: 'window.location.href="/profile"',
  uiType: 'third',
  type: 'button'
});

const buttonSend = Button({
  title: 'Send',
  onClick: '',
  uiType: 'third',
  type: 'button'
});

const ChatPage = ({activeChat, chats}) => {
  const chatList = chats.map(chat => ChatItem({
      title: chat.display_name || chat.username,
      onClick: `window.location.href='/chat'`,
      avatar: chat.avatar
  })).join('');

  return Handlebars.compile(chatTmpl)({
    buttonSearch,
    profileButton,
    activeChat,
    chatList,
    buttonSend
  });
}

export default ChatPage;
