import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { LearnerSubject } from '../combinedEntities';

export interface ListLearnerSubjectsRequest extends ObjectLiteral {
  readonly start: number;
  readonly size: number;
  readonly searchQuery: string;
  readonly onlyEnrolledSubjects: boolean;
  readonly learnerId: string;
}

export interface ListLearnerSubjectsResponse extends ObjectLiteral {
  readonly total: number;
  readonly learnerSubjects: ReadonlyArray<LearnerSubject>;
}
