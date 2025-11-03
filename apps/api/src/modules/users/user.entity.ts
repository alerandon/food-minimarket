import * as TypeORM from 'typeorm';
import * as argon2 from 'argon2';

@TypeORM.Entity('users')
export class User {
  @TypeORM.PrimaryGeneratedColumn('uuid')
  id: string;

  @TypeORM.Column({ unique: true })
  email: string;

  @TypeORM.Column({ type: 'varchar' })
  password: string;

  @TypeORM.CreateDateColumn()
  createdAt: Date;

  @TypeORM.UpdateDateColumn()
  updatedAt: Date;

  @TypeORM.BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  @TypeORM.BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.password.startsWith('$argon2')) {
      this.password = await argon2.hash(this.password);
    }
  }

  async validatePassword(password: string) {
    const isValid = this.password
      ? await argon2.verify(this.password, password)
      : false;
    return isValid;
  }
}
