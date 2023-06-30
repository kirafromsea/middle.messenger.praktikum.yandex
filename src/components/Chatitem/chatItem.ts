import Handlebars from 'handlebars';
import {chatItemTmpl} from './chatItem.tmpl.js';

interface ChatItemProps {
  avatar?: string;
  title: string;
  onClick?: () => void;
}

const ChatItem = ({avatar, title, onClick}: ChatItemProps) => {
  return Handlebars.compile(chatItemTmpl)({avatar, title, onClick});
}

export default ChatItem;
