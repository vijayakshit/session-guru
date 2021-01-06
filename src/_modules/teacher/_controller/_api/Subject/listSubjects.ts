import { getSubjectsForTeacher } from '../../../_model/Subjects';
import {
  ListSubjectsRequest,
  ListSubjectsResponse
} from '../../../_types/requestResponse/Subject';

const listSubjects = {
  controller: async (
    listSubjectRequest: ListSubjectsRequest
  ): Promise<ListSubjectsResponse> => {
    const { teacherId, start, size } = listSubjectRequest;
    const [subjects, total] = await getSubjectsForTeacher(
      teacherId,
      start,
      size
    );

    const countEnrichedSubjects = subjects.map((subject) => {
      return {
        subjectId: subject.id,
        teacherId: subject.teacherId,
        subjectName: subject.subjectName,
        totalEnrolled: subject.enrollments.length
      };
    });

    return {
      total,
      teacherId,
      teacherSubjects: countEnrichedSubjects
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): ListSubjectsRequest => {
    const { sessionUser = {} } = session;
    const { start, size, searchQuery } = requestBody;
    return {
      start,
      size,
      searchQuery,
      teacherId: sessionUser.id
    };
  }
};
export default listSubjects;
