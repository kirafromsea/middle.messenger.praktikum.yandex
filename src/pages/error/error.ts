import Block from '../../classes/Block';
import Store from '../../classes/Store';
import errorTmpl from './error.tmpl';
import errors, {defaultErrorMessage} from './errorsList';

class ErrorPage extends Block {
  constructor() {
    console.log('=store', Store);
    const props = {errorCode: 404};
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
