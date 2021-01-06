import { Enrollment } from '../../../../_entities/Enrollment';
import { ObjectLiteral } from '../../../../_types/core';

export interface CreateEnrollmentRequest extends ObjectLiteral {
  readonly enrollments: ReadonlyArray<Enrollment>;
  readonly learnerId: string;
}

export interface CreateEnrollmentResponse extends ObjectLiteral {
  readonly created: boolean;
}

export interface DeleteEnrollmentRequest extends ObjectLiteral {
  readonly subjectId: string;
  readonly learnerId: string;
}

export interface DeleteEnrollmentResponse extends ObjectLiteral {
  readonly deleted: boolean;
}
