import Block from '../../classes/Block/Block';
import Input from '../Input/input';
import formTmpl from './form.tmpl';

type FormProps = {
    title?: string;
    events?: Record<string, Function>;
    controls: Input[];
    buttons: Block[];
    formClassName: string;
    controller?: Function;
    clearAfterSubmit?: boolean;
    isProcessing?: boolean;
};

class Form extends Block {
  controller: null | Function;

  constructor({...props}: FormProps) {
    super({
      title: '', isValid: true, ...props, isProcessing: false,
    });
    if (props.controller) this.controller = props.controller;
  }

  init() {
    const controls = this.children.controls as Input[];

    controls.forEach((control) => {
      control.setProps({
        validator: this.validate.bind(this),
      });
    });

    const buttons = this.children.buttons as Block[];
    buttons.forEach((button) => {
      if (button.getProps('type') === 'submit') {
        const oldOnClick = button.getProps('events')?.click;
        button.setProps({
          events: {
            click: async () => {
              this.submit().then(() => {
                if (oldOnClick) {
                  oldOnClick();
                }
              });
            },
          },
        });
      }
    });
  }

  validate() {
    const controls = this.children.controls as Input[];
    const controlsData = controls.map((item) => item.validate());

    this.setProps({
      data: controlsData.reduce(
        (result, {name, value}) => ({...result, [name]: value}),
        {},
      ),
    });

    const noValidInputs = controlsData.filter((item) => !!item.errorMessage);

    if (noValidInputs.length > 0) {
      this.setProps({isValid: false});
      const warningMessage = noValidInputs.map((item) => `- ${item.name} - ${item.errorMessage}`).join('\n');
      console.log('% The form has a problem: ', warningMessage);
    } else {
      this.setProps({isValid: true});
    }
  }

  async submit() {
    this.setProps({isProcessing: true});
    this.validate();
    const dataForm = this.getProps('data');

    console.log(`Data for form ${this.getProps('title')}`);
    console.log(dataForm);

    if (!this.getProps('isValid')) {
      console.log('Data is not valid. Need change information');
      return false;
    }

    console.log('Data form is valid. Go to next page');
    if (this.controller) {
      await this.controller(dataForm);
      this.clearForm();
    }

    this.setProps({isProcessing: false});
    return true;
  }

  clearForm() {
    if (this.props.clearAfterSubmit) {
      const controls = this.children.controls as Input[];
      controls.forEach((item) => item.clear());
    }
  }

  render() {
    return this.compile({template: formTmpl, context: {...this.props}});
  }
}

export default Form;
