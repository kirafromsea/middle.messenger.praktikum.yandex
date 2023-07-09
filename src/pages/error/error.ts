import Block from '../../classes/Block';
import errorTmpl from './error.tmpl';
import errors, {defaultErrorMessage} from './errorsList';
import {ErrorProps} from './types';

class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    const errorIndex = `error_${props.errorCode}`;
    super('div', {
      errorNumber: props.errorCode,
      errorMessage: errors[errorIndex] || defaultErrorMessage,
    });
  }

  render() {
    return this.compile({template: errorTmpl, context: this.props});
  }
}

export default ErrorPage;
