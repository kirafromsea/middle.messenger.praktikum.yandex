export const defaultErrorMessage = 'An unexpected error has occurred';

interface ErrorsType {
  [k: string]: string;
}

const errors: ErrorsType = {
  error_500: 'Internal Server Error',
  error_502: 'Bad Gateway',
  error_504: 'Gateway Timeout',
  error_404: 'Page not found',
  error_401: 'Unauthorized',
  error_400: 'Bad Request',
};

export default errors;
