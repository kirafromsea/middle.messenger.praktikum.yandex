import Handlebars from 'handlebars';
import {chatItemTmpl} from './chatItem.tmpl.js';

const ChatItem = ({avatar, title, onClick}) => {
  return Handlebars.compile(chatItemTmpl)({avatar, title, onClick});
}

export default ChatItem;
