import Block from '../../classes/Block';
import {MESSAGE_TYPE_SELF, MESSAGE_TYPE_COMPANION} from '../../utils/constants';
import messageItemTmpl from './messageItem.tmpl';

interface MessageItemProps {
    avatar: string;
    message: string;
    data: string;
    type: typeof MESSAGE_TYPE_SELF | typeof MESSAGE_TYPE_COMPANION;
}
class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    super('div', {...props});
  }

  render() {
    return this.compile({template: messageItemTmpl, context: this.props});
  }
}

export default MessageItem;
