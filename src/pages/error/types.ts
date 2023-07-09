import errors from './errorsList';

type KeysOf<T extends { [key: string]: string }> = { [P in keyof T]: string };

export type ErrorsType = keyof KeysOf<typeof errors>;

export interface ErrorProps {
    errorCode: 500 | 502 | 504 | 404 | 401 | 400;
}
