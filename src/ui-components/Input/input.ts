import Block from '../../classes/Block';
import inputTmpl from './input.tmpl';

export interface InputProps {
    name: string;
    type: string;
    value?: string;
    description?: string;
    placeholder?: string;
    required?: boolean;
    regExpValidate?: RegExp | null;
    events?: {
        [key: string]: (e?: Event) => void
    }
}

class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      regExpValidate: null,
      events: props.events || {},
      required: false,
      errorMessage: null,
      ...props,
    });
  }

  init() {
    const onChange = this.getProps('events')?.onChange;

    this.setProps({
      events: {
        change: (event: Event) => {
          const field = document.querySelector(`[name=${(event.target as HTMLInputElement).name}]`) as HTMLInputElement;
          this.setValue(field.value);
          this.validate();
          if (onChange) {
            onChange(event);
          }
        },
      },
    });
  }

  validate() {
    const value = this.getValue().trim() || '';
    if (this.getProps('required') && (!value || value === '')) {
      this.setProps({errorMessage: 'Not required'});
    } else if (this.getProps('regExpValidate')) {
      const valid = this.getProps('regExpValidate').test(value);
      this.setProps({errorMessage: !valid ? 'Incorrect value' : null});
    } else {
      this.setProps({errorMessage: null});
    }

    return {
      name: this.getProps('name'),
      value: this.getProps('value'),
      errorMessage: this.getProps('errorMessage'),
    };
  }

  public setValue(value: string) {
    this.setProps({value});
  }

  public getValue() {
    const field = this.element as HTMLElement;
    return (field.getElementsByTagName('input'))[0].value;
  }

  render() {
    return this.compile({
      template: inputTmpl,
      context: this.props,
    });
  }
}

export default Input;
