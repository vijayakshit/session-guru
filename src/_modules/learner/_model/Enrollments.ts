import { Enrollment } from '../../../_entities/Enrollment';
import { getConnection } from '../../../_utils/dbUtils';

export const getEnrollmentsForLearnerId = async (
  learnerId: string,
  start = 0,
  size = 10
): Promise<[ReadonlyArray<Enrollment>, number]> => {
  const [enrollments, total] = await (await getConnection())
    .getRepository(Enrollment)
    .createQueryBuilder('enrollment')
    .innerJoinAndSelect('enrollment.subject', 'subject')
    .leftJoinAndSelect('enrollment.learner', 'learner')
    .where('learner.id = :learnerId', { learnerId: learnerId })
    .andWhere('subject.id = enrollment.subjectId')
    .orderBy('enrollment.id', 'ASC')
    .skip(start)
    .take(size)
    .getManyAndCount();
  return [enrollments, total];
};

export const getEnrollmentsForLearnerForSubjects = async (
  learnerId: string,
  subjectIds: string[]
): Promise<ReadonlyArray<Enrollment>> => {
  const enrollments = await (await getConnection())
    .getRepository(Enrollment)
    .createQueryBuilder('enrollment')
    .innerJoinAndSelect('enrollment.subject', 'subject')
    .leftJoinAndSelect('enrollment.learner', 'learner')
    .where('learner.id = :learner_id', {
      learner_id: learnerId
    })
    .andWhere('subject.id IN (:...subject_ids)', {
      subject_ids: subjectIds
    })
    .getMany();

  return enrollments;
};

export const createSubjectEnrollmentsForLearner = async (
  enrollments: ReadonlyArray<Enrollment>
): Promise<boolean> => {
  await (await getConnection())
    .getRepository(Enrollment)
    .createQueryBuilder('enrollment')
    .insert()
    .into(Enrollment)
    .values(
      enrollments.map((enrollment) => {
        return {
          subject: enrollment.subject,
          learner: enrollment.learner,
          enrolled: true,
          attended: false
        };
      })
    )
    .execute();
  return true;
};

export const deleteSubjectsEnrollmentForLearner = async (
  learnerId: string,
  subjectId: string
): Promise<boolean> => {
  await (await getConnection())
    .createQueryBuilder()
    .delete()
    .from(Enrollment)
    .where('learnerId = :learnerId', { learnerId: learnerId })
    .andWhere('subjectId = :subjectId', { subjectId: subjectId })
    .execute();
  return true;
};
