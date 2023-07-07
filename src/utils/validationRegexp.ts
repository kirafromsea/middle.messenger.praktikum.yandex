export const NAME_REGEXP = /^[A-ZА-ЯЁ]{1}[a-zа-яёA-ZА-ЯЁ\-ъ]{0,254}$/;
export const EMAIL_REGEXP = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
export const USERNAME_REGEXP = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
export const PHONE_REGEXP = /^\+?\d{10,15}$/;
export const PASSWORD_REGEXP = /.*[A-ZА-Я1-9].*[A-ZА-Я1-9].*/;