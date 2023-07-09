import { ButtonProps } from '../../ui-components/Button/button.ts';

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
            onClick: (e: Event) => {
                console.log('Save new password', e);
                // добавить вывод "все успешно сохранено"
            },
        },
    },
];
