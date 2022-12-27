import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'cat_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  breed: string;

  @Column({
    nullable: false,
    default: 1,
  })
  age: number;
}
