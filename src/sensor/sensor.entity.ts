import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() //This decorator is used to mark classes that will be an entity
export class Sensor {
  @PrimaryGeneratedColumn() //Used to mark a specific class property as a table column for sensor entity id.
  // also generated primary
  id: number;

  @Column() //Used to mark a specific class property as a table column fpr temperature
  temperature: number;

  @Column() ///Used to mark a specific class property as a table column fpr humidity
  humidity: number;

  @CreateDateColumn({
    //This column will store a creation date of the inserted object.
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
