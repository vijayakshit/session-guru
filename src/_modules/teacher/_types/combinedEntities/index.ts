import { Subject } from '../../../../_entities/Subject';

export interface TeacherSubject {
  readonly subjectId: string;
  readonly teacherId: string;
  readonly subjectName: string;
  readonly totalEnrolled: number;
}

export interface LearnerSubjectEnrollment {
  readonly subjectId: string;
  readonly learnerId: string;
  readonly subjectName: string;
  readonly learnerName: string;
  readonly enrolled: boolean;
  readonly attended: boolean;
}
