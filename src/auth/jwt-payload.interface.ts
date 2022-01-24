import { UserRole } from './entities/user.role.enum';

export interface JwtPayload {
  username: string;
  role: UserRole;
}
