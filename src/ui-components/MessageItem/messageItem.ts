import Block from '../../classes/Block';
import {MESSAGE_TYPE_SELF, MESSAGE_TYPE_COMPANION} from '../../utils/constants';
import messageItemTmpl from './messageItem.tmpl';

type MessageTypeProps = typeof MESSAGE_TYPE_SELF | typeof MESSAGE_TYPE_COMPANION;

interface MessageItemProps {
    avatar: string;
    message: string;
    date: string;
    type: MessageTypeProps;
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
