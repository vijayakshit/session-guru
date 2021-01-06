import {
  getEnrollmentsForLearnerForSubjects,
  getEnrollmentsForLearnerId
} from '../../../_model/Enrollments';
import { getSubjects, getSubjectsById } from '../../../_model/Subjects';
import { LearnerSubject } from '../../../_types/combinedEntities/index';
import { getTeachers } from '../../../_model/User';
import {
  ListLearnerSubjectsRequest,
  ListLearnerSubjectsResponse
} from '../../../_types/requestResponse/Subject';

const listLearnerSubjects = {
  controller: async (
    listLearnerSubjectsRequest: ListLearnerSubjectsRequest
  ): Promise<ListLearnerSubjectsResponse> => {
    const {
      learnerId,
      onlyEnrolledSubjects,
      start,
      size
    } = listLearnerSubjectsRequest;

    let learnerSubjects;
    let total;

    if (onlyEnrolledSubjects === true) {
      const [enrollements, totalEnrollments] = await getEnrollmentsForLearnerId(
        learnerId,
        start,
        size
      );

      total = totalEnrollments;

      learnerSubjects = enrollements.map((enrollment) => {
        return {
          subjectId: enrollment.subject.id,
          teacherId: enrollment.subject.teacherId,
          subjectName: enrollment.subject.subjectName,
          enrolled: enrollment.enrolled,
          attended: enrollment.attended ? true : false
        };
      }) as LearnerSubject[];
    } else {
      const [subjects, totalSubjects] = await getSubjects(start, size);
      const subjectIds = subjects.map((subject) => subject.id);
      const enrollements = await getEnrollmentsForLearnerForSubjects(
        learnerId,
        subjectIds
      );

      total = totalSubjects;

      learnerSubjects = subjects.map((subject) => {
        const enrollment = enrollements.find(
          (enrollment) => enrollment.subject.id === subject.id
        );
        return {
          subjectId: subject.id,
          teacherId: subject.teacherId,
          subjectName: subject.subjectName,
          enrolled: enrollment ? true : false,
          attended: enrollment && enrollment.attended ? true : false
        };
      }) as LearnerSubject[];
    }

    //Getting all unique teachers for these subjects
    const uniqueteacherIds = Array.from(
      new Set(learnerSubjects.map((learnerSubject) => learnerSubject.teacherId))
    );

    const teachersList =
      uniqueteacherIds.length > 0 ? await getTeachers(uniqueteacherIds) : [];

    const enrichedLearnerSubjects = learnerSubjects.map((learnerSubject) => {
      return {
        ...learnerSubject,
        teacherName: teachersList.find(
          (teacher) => teacher.id == learnerSubject.teacherId
        )?.email
      };
    });

    return {
      total: total,
      learnerSubjects: enrichedLearnerSubjects
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): ListLearnerSubjectsRequest => {
    const { sessionUser = {} } = session;
    const { start, size, searchQuery, onlyEnrolledSubjects } = requestBody;
    return {
      start,
      size,
      onlyEnrolledSubjects,
      searchQuery,
      learnerId: sessionUser.id
    };
  }
};
export default listLearnerSubjects;
