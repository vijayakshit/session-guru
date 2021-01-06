import { deleteSubjectsEnrollmentForLearner } from '../../../_model/Enrollments';
import {
  DeleteEnrollmentResponse,
  DeleteEnrollmentRequest
} from '../../../_types/requestResponse/Enrollment';

const deleteEnrollment = {
  controller: async (
    deleteEnrollmentRequest: DeleteEnrollmentRequest
  ): Promise<DeleteEnrollmentResponse> => {
    const { subjectId, learnerId } = deleteEnrollmentRequest;

    const deleted = await deleteSubjectsEnrollmentForLearner(
      learnerId,
      subjectId
    );

    return {
      deleted: deleted
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): DeleteEnrollmentRequest => {
    const { sessionUser = {} } = session;
    const { subjectId } = requestBody;
    return {
      subjectId,
      learnerId: sessionUser.id
    };
  }
};
export default deleteEnrollment;
