import Block from '../../classes/Block';
import {ChatItemType} from '../../types/chats';
import chatItemTmpl from './chatItem.tmpl';

interface ChatItemProps extends Omit<ChatItemType, 'messages'> {
  events?: {
    [key: string]: (chatId: number) => void
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super('div', {...props});
  }

  init() {
    console.log('=chatItem', this.props);
    if (this.getProps('events')?.onClick) {
      const {onClick} = this.getProps('events');
      this.setProps({events: {click: () => onClick(this.getProps('id'))}});
    }
  }

  render() {
    console.log('=chatItem render');
    return this.compile({template: chatItemTmpl, context: this.props});
  }
}

export default ChatItem;
