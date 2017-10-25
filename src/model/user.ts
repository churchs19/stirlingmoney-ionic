import { IUserGroupMember } from './user-group-member';

export interface User extends IUserGroupMember {
  uid: string,
  email: string,
  userGroup?: string
}
