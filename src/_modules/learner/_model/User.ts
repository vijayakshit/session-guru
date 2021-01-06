import { getConnection } from 'typeorm';
import { User } from '../../../_entities/User';

export const getTeachers = async (teacherIds: string[]): Promise<User[]> => {
  const teachers = await (await getConnection())
    .getRepository(User)
    .createQueryBuilder('user')
    .where('id IN (:...teacherIds)', {
      teacherIds: teacherIds
    })
    .getMany();

  return teachers;
};
