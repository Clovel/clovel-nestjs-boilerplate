/* Type imports ---------------------------------------- */
import type { User as UserModel } from '@prisma/client';

/* Users DTO types ------------------------------------- */
export interface UserDTO extends Omit<UserModel, 'password'> {}
