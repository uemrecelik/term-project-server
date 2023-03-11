import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plantId: number;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
