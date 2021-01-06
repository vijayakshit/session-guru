import { getEnrollmentsForSubject } from '../../../_model/Enrollments';
import { getSubjectById } from '../../../_model/Subjects';
import {
  GetSubjectEnrollmentRequest,
  GetSubjectEnrollmentResponse
} from '../../../_types/requestResponse/Enrollment';

const listSubjectEnrollment = {
  controller: async (
    getSubjectEnrollmentRequest: GetSubjectEnrollmentRequest
  ): Promise<GetSubjectEnrollmentResponse> => {
    const { teacherId, subjectId, start, size } = getSubjectEnrollmentRequest;

    const subject = await getSubjectById(subjectId);

    const [enrollments, total] = await getEnrollmentsForSubject(
      teacherId,
      subjectId,
      start,
      size
    );

    return {
      total,
      teacherId,
      subjectId,
      subject,
      enrollments: enrollments.map((enrollment) => {
        return {
          subjectId: enrollment.subject.id,
          learnerId: enrollment.learner.id,
          subjectName: enrollment.subject.subjectName,
          learnerName: enrollment.learner.email,
          enrolled: enrollment.enrolled,
          attended: enrollment.attended
        };
      })
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): GetSubjectEnrollmentRequest => {
    const { sessionUser = {} } = session;
    const { start, size, searchQuery, subjectId } = requestBody;
    return {
      start,
      size,
      subjectId,
      searchQuery,
      teacherId: sessionUser.id
    };
  }
};
export default listSubjectEnrollment;
