import Block from '../../classes/Block';
import chatModalTmpl from './chaModal.tmpl';
import Form from '../../ui-components/Form/form';
import Button, {ButtonProps} from '../../ui-components/Button/button';
import Input from '../../ui-components/Input/input';
import {modalsMap, ModalsSettingsNameProps} from './modalsSettings';

type ChatModalProps = {
  modalName: ModalsSettingsNameProps;
  controller: Function,
  onClose?: () => void,
  onSubmit?: () => void;
}

class ChatModal extends Block {
  constructor(props: ChatModalProps) {
    super('div', {...props}, 'chat-modal');
  }

  init() {
    const modalName: ModalsSettingsNameProps = this.getProps('modalName');
    const controller = this.getProps('controller');
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
      }
    ];

    const controls = modalsMap[modalName].inputs.map((item) => new Input({...item}));

    const buttons = buttonsModal.map((item) => new Button({...item}));

    this.children.modalForm = new Form({
      title: modalsMap[modalName].title,
      controls,
      buttons,
      controller,
      formClassName: 'add-chat-form',
    });

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

  render() {
    return this.compile({template: chatModalTmpl, context: {...this.props}});
  }
}

export default ChatModal;
