import { createSubjectEnrollmentsForLearner } from '../../../_model/Enrollments';
import { Enrollment } from '../../../../../_entities/Enrollment';
import {
  CreateEnrollmentRequest,
  CreateEnrollmentResponse
} from '../../../_types/requestResponse/Enrollment';

const createEnrollment = {
  controller: async (
    createEnrollmentRequest: CreateEnrollmentRequest
  ): Promise<CreateEnrollmentResponse> => {
    const { enrollments } = createEnrollmentRequest;
    const created = await createSubjectEnrollmentsForLearner(enrollments);

    return {
      created: created
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): CreateEnrollmentRequest => {
    const { sessionUser = {} } = session;
    const { subjectIds } = requestBody;
    return {
      enrollments: subjectIds.map((subjectId: any) => {
        return {
          learner: sessionUser.id,
          subject: subjectId,
          enrolled: true,
          attended: false
        };
      }),
      learnerId: sessionUser.id
    };
  }
};
export default createEnrollment;
