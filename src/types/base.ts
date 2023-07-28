export type KeysOf<T extends { [key: string]: any }> = { [P in keyof T]: any };
