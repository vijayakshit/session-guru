import { Subject } from '../../../_entities/Subject';
import { User } from '../../../_entities/User';
import { ObjectLiteral } from '../../../_types/core';
import { getConnection } from '../../../_utils/dbUtils';

export const createSubjectsForTeacher = async (
  teacherId: string,
  subjects: ReadonlyArray<Subject>
): Promise<ObjectLiteral> => {
  const { generatedMaps } = await (await getConnection())
    .createQueryBuilder()
    .insert()
    .into(Subject)
    .values(
      subjects.map((subject) => {
        return {
          subjectName: subject.subjectName,
          teacherId: teacherId
        };
      })
    )
    .execute();

  return generatedMaps;
};

export const getSubjectsForTeacher = async (
  teacherId: string,
  start = 0,
  size = 10
): Promise<[ReadonlyArray<Subject>, number]> => {
  const [subjects, totalSubjects] = await (await getConnection())
    .getRepository(Subject)
    .createQueryBuilder('subject')
    .leftJoinAndSelect('subject.teacher', 'teacher')
    .leftJoinAndSelect('subject.enrollments', 'enrollment')
    .where('teacher.id = :teacherId', { teacherId: teacherId })
    .orderBy('subject.subjectName', 'ASC')
    .skip(start)
    .take(size)
    .getManyAndCount();
  return [subjects, totalSubjects];
};

export const getSubjectById = async (subjectId: string): Promise<Subject> => {
  const subject = await (await getConnection())
    .getRepository(Subject)
    .findOneOrFail({ id: subjectId });

  return subject;
};

export const updateSubjectForTeacher = async (
  teacherId: string,
  subjectId: string,
  updatedSubject: Subject
): Promise<Subject> => {
  const { subjectName } = updatedSubject;
  await (await getConnection())
    .createQueryBuilder()
    .update(Subject)
    .set({ subjectName: subjectName })
    .where('teacherId = :teacherId', { teacherId: teacherId })
    .andWhere('id = :subjectId', { subjectId: subjectId })
    .execute();

  return updatedSubject;
};

export const deleteSubjectsForTeacher = async (
  teacherId: string,
  subjectIds: ReadonlyArray<string>
): Promise<ReadonlyArray<string>> => {
  await (await getConnection())
    .createQueryBuilder()
    .delete()
    .from(Subject)
    .where('id IN (:...subjectIds)', {
      subjectIds: subjectIds
    })
    .andWhere('teacherId = :teacherId', { teacherId: teacherId })
    .execute();
  return subjectIds;
};
