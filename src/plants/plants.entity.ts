import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Sensor } from '../sensor/sensor.entity';

@Entity()
export class Plants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  optimum_temp: number;

  @Column()
  optimum_hum: number;

  @Column()
  sensorId: number;

  @Column()
  imageUrl: string;

  @Column('json')
  position: JSON;

  @Column()
  userId: number;

  @Column({ length: 999 })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToOne(() => Sensor, (sensor) => sensor.id)
  sensor: Sensor;
}
