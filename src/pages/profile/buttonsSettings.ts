import {ButtonProps} from '../../ui-components/Button/button';

export const profileFormButtons: ButtonProps[] = [
  {
    title: 'Save profile',
    uiType: 'primary',
    type: 'submit',
    disabled: false,
    events: {
      onClick: () => {
        console.log('Save new information about profile');
        // добавить вывод "все успешно сохранено"
      },
    },
  },
];

export const passwordFormButtons: ButtonProps[] = [
  {
    title: 'Save new password',
    uiType: 'primary',
    type: 'submit',
    disabled: false,
    events: {
      onClick: (e?: Event) => {
        if (!e) {
          return;
        }
        const field = document.querySelector(`[name=${(e.target as HTMLInputElement).name}]`) as HTMLInputElement;
        console.log('Save new password', field.value);
        // добавить вывод "все успешно сохранено"
      },
    },
  },
];
