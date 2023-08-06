import Block from '../../classes/Block';
import Form from '../../ui-components/Form/form';
import Button, {ButtonProps} from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import {ChatItemType} from '../../types/chats';
import ChatController from '../../controllers/ChatController';
import addChatModalTmpl from './addChaModal.tmpl';

type ChatModalProps = {
  onClose?: () => void,
  onSubmit?: () => void;
  activeChat?: ChatItemType;
}

const addChatInputs = [
  {
    name: 'title',
    type: 'text',
    value: '',
    placeholder: 'Chat title',
    required: true,
    description: '',
  },
];

class ChatModal extends Block {
  constructor(props: ChatModalProps) {
    super('div', {...props}, 'chat-modal');
  }

  init() {
    const onClose = this.getProps('onClose');
    const buttonsModal: ButtonProps[] = [
      {
        title: 'Cancel',
        uiType: 'secondary',
        type: 'button',
        disabled: false,
        events: {
          onClick: () => {
            if (onClose) {
              onClose();
            }
          },
        },
      },
      {
        title: 'OK',
        uiType: 'primary',
        type: 'submit',
        disabled: false,
        events: {
          onClick: () => {
            if (this.props.onSubmit) {
              this.props.onSubmit();
            }
            if (onClose) {
              onClose();
            }
          },
        },
      },
    ];

    const buttons = buttonsModal.map((item) => new Button({...item}));
    const controls = addChatInputs.map((item) => new Input({...item}));

    this.addForm(controls, buttons);

    this.children.closeButton = new Button({
      title: 'X',
      uiType: 'third',
      type: 'button',
      events: {
        onClick: () => {
          if (onClose) {
            onClose();
          }
        },
      },
    });
  }

  addForm(controls: Input[], buttons: Button[]) {
    this.children.modalForm = new Form({
      title: 'Create new chat',
      controls,
      buttons,
      controller: ChatController.addChat.bind(ChatController),
      formClassName: 'add-chat-modal',
    });
  }

  render() {
    return this.compile({template: addChatModalTmpl, context: {...this.props}});
  }
}

export default ChatModal;
