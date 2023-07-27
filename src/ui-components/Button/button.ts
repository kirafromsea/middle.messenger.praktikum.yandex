import Block from '../../classes/Block';
import buttonTmpl from './button.tmpl';

export type ButtonProps = {
  title: string;
  onClick?: () => void;
  uiType?: 'primary' | 'secondary' | 'third' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
  events?: {
    [key: string]: (e?: Event) => void
  }
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', {
      type: 'button',
      uiType: 'primary',
      disabled: false,
      ...props,
    });
  }

  init() {
    if (this.getProps('events')?.onClick) {
      const {onClick} = this.getProps('events');
      this.setProps({events: {click: (e: Event) => onClick(e)}});
    }
  }

  render() {
    return this.compile({
      template: buttonTmpl,
      context: this.props,
    });
  }
}

export default Button;
