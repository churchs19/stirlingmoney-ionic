import { IUserGroupMember } from './user-group-member';

export interface IUser extends IUserGroupMember {
  uid: string;
  email: string;
  userGroup?: string;
  displayName: string;
  photoURL: string;
}
