import { Subject } from '../../../_entities/Subject';
import { Enrollment } from '../../../_entities/Enrollment';
import { ObjectLiteral } from '../../../_types/core';
import { getConnection } from '../../../_utils/dbUtils';

export const getEnrollmentsForSubject = async (
  teacherId: string,
  subjectId: string,
  start = 0,
  size = 10
): Promise<[ReadonlyArray<Enrollment>, number]> => {
  const [enrollments, totalEnrollments] = await (await getConnection())
    .getRepository(Enrollment)
    .createQueryBuilder('enrollment')
    .leftJoinAndSelect('enrollment.subject', 'subject')
    .leftJoinAndSelect('enrollment.learner', 'learner')
    .where('subject.id = :subjectId', { subjectId: subjectId })
    .andWhere('subject.teacherId = :teacherId', { teacherId: teacherId })
    .orderBy('enrollment.id', 'ASC')
    .skip(start)
    .take(size)
    .getManyAndCount();
  return [enrollments, totalEnrollments];
};

export const updateAttendanceForEnrollments = async (
  subjectId: string,
  learnerIds: string[],
  attended: boolean
): Promise<boolean> => {
  await (await getConnection())
    .createQueryBuilder()
    .update(Enrollment)
    .set({ attended: attended })
    .where('subjectId = :subjectId', { subjectId: subjectId })
    .andWhere('learnerId IN (:...learnerIds)', {
      learnerIds: learnerIds
    })
    .execute();

  return true;
};

export const deleteAllEnrollmentsForASubject = async (
  subjectIds: ReadonlyArray<string>
): Promise<boolean> => {
  await (await getConnection())
    .createQueryBuilder()
    .delete()
    .from(Enrollment)
    .andWhere('subjectId IN (:...subjectIds)', {
      subjectIds: subjectIds
    })
    .execute();
  return true;
};
