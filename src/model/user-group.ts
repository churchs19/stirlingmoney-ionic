import { IUserGroupMember } from './user-group-member';

export interface IUserGroup {
  id: string;
  members: IUserGroupMember[];
}
