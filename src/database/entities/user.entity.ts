import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from './base.entity'

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  firstname: string

  @Column({ length: 500 })
  lastname: string

  @Column({ length: 500 })
  email: string

  @Column('text')
  password_digest: string

  @Column({ default: true })
  active: boolean
}
