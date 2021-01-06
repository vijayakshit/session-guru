import { ObjectLiteral } from '../../../../_types/core';
import { Subject } from '../../../../_entities/Subject';
import { LearnerSubjectEnrollment } from '../combinedEntities';

export interface GetSubjectEnrollmentRequest extends ObjectLiteral {
  readonly start: number;
  readonly size: number;
  readonly searchQuery: string;
  readonly teacherId: string;
  readonly subjectId: string;
}

export interface GetSubjectEnrollmentResponse extends ObjectLiteral {
  readonly total: number;
  readonly teacherId: string;
  readonly subjectId: string;
  readonly subject: Subject;
  readonly enrollments: ReadonlyArray<LearnerSubjectEnrollment>;
}

export interface UpdateSubjectAttendanceRequest extends ObjectLiteral {
  readonly teacherId: string;
  readonly subjectId: string;
  readonly learnerIds: string[];
  readonly attended: boolean;
}

export interface UpdateSubjectAttendanceResponse extends ObjectLiteral {
  readonly updated: boolean;
}
