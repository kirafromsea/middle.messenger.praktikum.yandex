import {UserProfileType} from './chats';

export interface UpdateProfileProps extends Omit<UserProfileType, 'password' | 'avatar'> {}

export interface UpdatePasswordProps {
  oldPassword: string;
  newPassword: string;
}
