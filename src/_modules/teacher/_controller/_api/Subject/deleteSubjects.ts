import { deleteAllEnrollmentsForASubject } from '../../../_model/Enrollments';
import { deleteSubjectsForTeacher } from '../../../_model/Subjects';
import {
  DeleteSubjectsRequest,
  DeleteSubjectsResponse
} from '../../../_types/requestResponse/Subject';

const deleteSubjects = {
  controller: async (
    deleteSubjectsRequest: DeleteSubjectsRequest
  ): Promise<DeleteSubjectsResponse> => {
    const { teacherId, subjectIds } = deleteSubjectsRequest;

    await deleteAllEnrollmentsForASubject(subjectIds);

    const deletedSubjectIds = await deleteSubjectsForTeacher(
      teacherId,
      subjectIds
    );

    return {
      deletedSubjectIds
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): DeleteSubjectsRequest => {
    const { sessionUser = {} } = session;
    const { subjectIds } = requestBody;
    return {
      subjectIds,
      teacherId: sessionUser.id
    };
  }
};
export default deleteSubjects;
