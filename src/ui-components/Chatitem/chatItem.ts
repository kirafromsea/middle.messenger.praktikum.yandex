import Block from '../../classes/Block';
import {ChatItemType} from '../../types/chats';
import chatItemTmpl from './chatItem.tmpl';
import {DEFAULT_AVATAR} from '../../utils/constants';

export interface ChatItemProps extends ChatItemType {
  idChat?: number;
  isActive?: boolean;
  events?: {
    [key: string]: (chatId: number) => void
  }
}

class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      avatar: props.avatar || DEFAULT_AVATAR,
    });
  }

  init() {
    if (this.getProps('events')?.onClick) {
      const {onClick} = this.getProps('events');
      this.setProps({
        ...this.props,
        events: {
          click: () => {
            onClick(this.getProps('idChat'));
          },
        },
      });
    }
  }

  render() {
    return this.compile({template: chatItemTmpl, context: this.props});
  }
}

export default ChatItem;
