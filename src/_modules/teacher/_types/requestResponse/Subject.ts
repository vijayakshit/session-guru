import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { Subject } from '../../../../_entities/Subject';
import { TeacherSubject } from '../combinedEntities';
export interface CreateSubjectsRequest extends ObjectLiteral {
  readonly teacherId: string;
  readonly subjects: ReadonlyArray<Subject>;
}

export interface CreateSubjectsResponse extends ObjectLiteral {
  readonly createdSubjects: ObjectLiteral;
}

export interface ListSubjectsRequest extends ObjectLiteral {
  readonly start: number;
  readonly size: number;
  readonly searchQuery: string;
  readonly teacherId: string;
}

export interface ListSubjectsResponse extends ObjectLiteral {
  readonly total: number;
  readonly teacherId: string;
  readonly teacherSubjects: ReadonlyArray<TeacherSubject>;
}

export interface UpdateSubjectRequest extends ObjectLiteral {
  readonly teacherId: string;
  readonly subjectId: string;
  readonly updatedSubject: Subject;
}

export interface UpdateSubjectResponse extends ObjectLiteral {
  readonly subject: Subject;
}

export interface DeleteSubjectsRequest extends ObjectLiteral {
  readonly teacherId: string;
  readonly subjectIds: ReadonlyArray<string>;
}

export interface DeleteSubjectsResponse {
  readonly deletedSubjectIds: ReadonlyArray<string>;
}
