import { IUserGroupMember } from './user-group-member';

export class UserGroup {
  public id: string;
  public members: IUserGroupMember[];
  constructor(
  ) {
    this.members = [];
  }

}
