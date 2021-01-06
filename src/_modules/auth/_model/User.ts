import { getConnection } from '../../../_utils/dbUtils';
import { Role, User } from '../../../_entities/User';
import { generatePasswordHash } from '../../../_utils/authenticationUtils';
import { InsertResult } from 'typeorm';

export const createUser = async (
  email: string,
  password: string,
  role: Role
): Promise<boolean> => {
  const passhash = generatePasswordHash(password);
  await (await getConnection())
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ email: email, passhash: passhash, role: role }])
    .execute();

  return true;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await (await getConnection())
    .getRepository(User)
    .findOneOrFail({ email: email });

  return user;
};
