import { Role } from '@prisma/client';

export interface AuthRequestUser {
  id: string;
  email: string;
  role: Role;
}
