import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subject } from './Subject';
import { User } from './User';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Subject, (subject) => subject.enrollments)
  subject: Subject;

  @ManyToOne((type) => User, (user) => user.enrollments)
  learner: User;

  @Column()
  enrolled: boolean;

  @Column()
  attended: boolean;
}
