import Block from '../../classes/Block';
import errorTmpl from './error.tmpl';
import errors, {defaultErrorMessage} from './errorsList';

class ErrorPage extends Block {
  constructor() {
    const props = {errorCode: 400};
    const errorIndex = `error_${props.errorCode}`;
    super('div', {
      errorNumber: props.errorCode,
      errorMessage: (errorIndex.trim() !== '' && errors[errorIndex]) ? errors[errorIndex] : defaultErrorMessage,
    });
  }

  render() {
    return this.compile({template: errorTmpl, context: this.props});
  }
}

export default ErrorPage;
