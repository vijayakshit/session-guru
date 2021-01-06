import { createSubjectsForTeacher } from '../../../_model/Subjects';
import { Subject } from '../../../../../_entities/Subject';
import {
  CreateSubjectsRequest,
  CreateSubjectsResponse
} from '../../../_types/requestResponse/Subject';

const createSubjects = {
  controller: async (
    createSubjectsRequest: CreateSubjectsRequest
  ): Promise<CreateSubjectsResponse> => {
    const { teacherId, subjects } = createSubjectsRequest;

    const createdSubjects = await createSubjectsForTeacher(teacherId, subjects);

    return {
      createdSubjects: createdSubjects
    };
  },
  parser: (
    requestBody: Record<any, any> = {},
    _reqParams: Record<any, any> = {},
    _queryParams: Record<any, any> = {},
    session: Record<any, any> = {}
  ): CreateSubjectsRequest => {
    const { sessionUser = {} } = session;
    const { subjects } = requestBody;
    const subjectsWithTeacherId = subjects.map((subject: Subject) => {
      return {
        ...subject,
        teacherId: sessionUser.id
      };
    });
    return {
      teacherId: sessionUser.id,
      subjects: subjectsWithTeacherId
    };
  }
};
export default createSubjects;
