import { IUserGroupMember } from './user-group-member';

export class User implements IUserGroupMember {
  constructor(
    public uid: string,
    public email: string
  ) {}
}
