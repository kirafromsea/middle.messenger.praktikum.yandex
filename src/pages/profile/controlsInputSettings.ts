// TODO для инпутов добавить заголовок и description в form-field
// В следующей итерации сделеть переиспользование полей для разных форм
import {
  NAME_REGEXP, PASSWORD_REGEXP, EMAIL_REGEXP, PHONE_REGEXP, USERNAME_REGEXP,
} from '../../utils/validationRegexp';

export const controlsProfile = [
  {
    name: 'first_name',
    type: 'text',
    value: '',
    placeholder: 'First name',
    required: true,
    regExpValidate: NAME_REGEXP,
    description: '', // добавить аннотацию для допустимых символов
  },
  {
    name: 'second_name',
    type: 'text',
    value: '',
    placeholder: 'Second name',
    required: true,
    regExpValidate: NAME_REGEXP,
    description: '',
  },
  {
    name: 'display_mame',
    type: 'text',
    value: '',
    placeholder: 'Display name',
    required: true,
    description: '',
  },
  {
    name: 'login',
    type: 'text',
    value: '',
    placeholder: 'Username',
    required: true,
    regExpValidate: USERNAME_REGEXP,
    description: '',
  },
  {
    name: 'email',
    type: 'text',
    value: '',
    placeholder: 'Email',
    required: true,
    regExpValidate: EMAIL_REGEXP,
    description: '',
  },
  {
    name: 'phone',
    type: 'text',
    placeholder: 'Phone',
    required: true,
    regExpValidate: PHONE_REGEXP,
    description: '',
  },
];

export const controlsPassword = [
  {
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Old password',
    required: true,
    regExpValidate: PASSWORD_REGEXP,
    description: '',
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'New password',
    required: true,
    regExpValidate: PASSWORD_REGEXP,
    description: '',
  },
];
