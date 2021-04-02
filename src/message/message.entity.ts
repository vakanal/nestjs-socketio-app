import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  sender: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  message: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: (): string => 'CURRENT_TIMESTAMP',
  })
  date: Date;
}
