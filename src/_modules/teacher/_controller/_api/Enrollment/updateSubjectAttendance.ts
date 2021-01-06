import { updateAttendanceForEnrollments } from '../../../_model/Enrollments';
import {
  UpdateSubjectAttendanceRequest,
  UpdateSubjectAttendanceResponse
} from '../../../_types/requestResponse/Enrollment';

const listSubjectEnrollment = {
  controller: async (
    getSubjectEnrollmentRequest: UpdateSubjectAttendanceRequest
  ): Promise<UpdateSubjectAttendanceResponse> => {
    const { attended, subjectId, learnerIds } = getSubjectEnrollmentRequest;

    const updated = await updateAttendanceForEnrollments(
      subjectId,
      learnerIds,
      attended
    );

    return {
      updated: updated
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): UpdateSubjectAttendanceRequest => {
    const { sessionUser = {} } = session;
    const { attended, learnerIds, subjectId } = requestBody;
    return {
      attended,
      subjectId,
      learnerIds,
      teacherId: sessionUser.id
    };
  }
};
export default listSubjectEnrollment;
