import Handlebars from 'handlebars';
import errorTmpl from './error.tmpl.ts';
import errors, { defaultErrorMessage } from './errorsList.ts';
import { ErrorProps, ErrorsType } from './types.ts';
// import Button from '../../ui-components/Button/button.ts';

/*
const indexPageButton = Button({
    title: 'Go to index page',
    onClick: "window.location.href='/'",
    uiType: 'primary',
    type: 'button',
});
*/
const ErrorPage = ({ errorCode }: ErrorProps) => {
    const errorIndex: ErrorsType = `error_${errorCode}`;

    return Handlebars.compile(errorTmpl)({
        errorNumber: errorCode,
        errorMessage: errors[errorIndex] || defaultErrorMessage,
    // button: indexPageButton,
    });
};

export default ErrorPage;
