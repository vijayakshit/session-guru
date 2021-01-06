import { Subject } from '../../../_entities/Subject';
import { getConnection } from '../../../_utils/dbUtils';

export const getSubjectsById = async (
  subjectIds: string[]
): Promise<Subject[]> => {
  const subjects = await (await getConnection())
    .getRepository(Subject)
    .createQueryBuilder('subject')
    .createQueryBuilder()
    .select()
    .where('id IN (:...subjectIds)', {
      subjectIds: subjectIds
    })
    .execute();

  return subjects;
};

export const getSubjects = async (
  start = 0,
  size = 10
): Promise<[Subject[], number]> => {
  const [subjects, total] = await (await getConnection())
    .getRepository(Subject)
    .createQueryBuilder('subject')
    .select()
    .skip(start)
    .take(size)
    .getManyAndCount();

  return [subjects, total];
};
