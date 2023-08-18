import Block from '../../classes/Block';
import Store from '../../classes/Store';
import errorTmpl from './error.tmpl';
import errors, {defaultErrorMessage} from './errorsList';

const DEFAULT_ERROR_CODE = 404;

class ErrorPage extends Block {
  constructor() {
    const {error} = Store.getState();
    const props = {errorCode: error?.code || DEFAULT_ERROR_CODE};
    const errorIndex = `error_${props.errorCode}`;
    super({
      errorNumber: props.errorCode,
      errorMessage: (errorIndex.trim() !== '' && errors[errorIndex]) ? errors[errorIndex] : defaultErrorMessage,
    });
  }

  render() {
    return this.compile({template: errorTmpl, context: this.props});
  }
}

export default ErrorPage;
