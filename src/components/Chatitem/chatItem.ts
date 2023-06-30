import Handlebars from 'handlebars';
import { ChatItemType } from '../../types/chats.ts';
import chatItemTmpl from './chatItem.tmpl.ts';

interface ChatItemProps extends Omit<ChatItemType, 'messages' | 'login'> {
  onClick?: string;
}

const ChatItem = ({ avatar, displayName, onClick }: ChatItemProps) => Handlebars.compile(chatItemTmpl)({ avatar, displayName, onClick });

export default ChatItem;
