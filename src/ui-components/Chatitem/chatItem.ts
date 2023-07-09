import Block from '../../classes/Block';
import {ChatItemType} from '../../types/chats';
import chatItemTmpl from './chatItem.tmpl';

interface ChatItemProps extends Omit<ChatItemType, 'messages'> {
  events?: {
    [key: string]: (login: string) => void
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    console.log('=chat props', props);
    super('div', {...props});
  }

  init() {
    if (this.getProps('events')?.onClick) {
      const {onClick} = this.getProps('events');
      this.setProps({events: {click: () => onClick(this.getProps('login'))}});
    }
  }

  render() {
    return this.compile({template: chatItemTmpl, context: this.props});
  }
}

export default ChatItem;
