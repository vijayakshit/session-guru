import { Subject } from '../../../../_entities/Subject';

export interface LearnerSubject {
  readonly subjectId: string;
  readonly teacherId: string;
  readonly subjectName: string;
  readonly teacherName?: string;
  readonly enrolled: boolean;
  readonly attended: boolean;
}
