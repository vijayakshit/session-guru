import {
  UpdateSubjectResponse,
  UpdateSubjectRequest
} from '../../../_types/requestResponse/Subject';

import { updateSubjectForTeacher } from '../../../_model/Subjects';

const updateSubject = {
  controller: async (
    updateSubjectsRequest: UpdateSubjectRequest
  ): Promise<UpdateSubjectResponse> => {
    const {
      teacherId,
      updatedSubject: subject,
      subjectId
    } = updateSubjectsRequest;

    const updatedSubject = await updateSubjectForTeacher(
      teacherId,
      subjectId,
      subject
    );

    return {
      subject: updatedSubject
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): UpdateSubjectRequest => {
    const { sessionUser = {} } = session;
    const { updatedSubject = {}, subjectId } = requestBody;
    return {
      updatedSubject,
      subjectId: subjectId,
      teacherId: sessionUser.id
    };
  }
};
export default updateSubject;
