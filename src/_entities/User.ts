import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Enrollment } from './Enrollment';
import { Subject } from './Subject';

export enum Role {
  TEACHER = 'TEACHER',
  LEARNER = 'LEARNER'
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role
  })
  role: Role;

  @OneToMany((type) => Subject, (subject) => subject.teacher)
  subjects: Subject[];

  @OneToMany((type) => Enrollment, (enrollment) => enrollment.learner)
  enrollments: Enrollment[];

  @Column()
  passhash: string;
}
