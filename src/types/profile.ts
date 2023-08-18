import {UserProfileType} from './chats';

export interface UpdateProfileProps extends Omit<UserProfileType, 'password' | 'avatar'> {}

export type UpdatePasswordProps = {
  oldPassword: string;
  newPassword: string;
}
