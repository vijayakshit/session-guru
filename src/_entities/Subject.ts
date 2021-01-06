import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Enrollment } from './Enrollment';
import { User } from './User';

@Entity()
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacherId: string;

  @Column()
  subjectName: string;

  @ManyToOne((type) => User, (user) => user.subjects)
  teacher: User;

  @OneToMany((type) => Enrollment, (enrollment) => enrollment.subject)
  enrollments: Enrollment[];
}
