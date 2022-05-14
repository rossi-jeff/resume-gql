import { BaseModel } from './base-model.abstract';
import { Column, BeforeInsert } from 'typeorm';
import { Name, Credentials } from '../embedded';
import { v4 } from 'uuid';
import { SaltRounds } from '../constants';
import * as bcrypt from 'bcrypt';

export abstract class User extends BaseModel {
  @Column(type => Name)
  Name: Name;

  @Column(type => Credentials)
  Credentials: Credentials;

  @Column({ nullable: true, length: 40 })
  UUID: string;

  @BeforeInsert()
  setUUID() {
    this.UUID = v4();
  }

  setEncryptedPassword(pasword: string) {
    if (!this.Credentials) this.Credentials = {};
    this.Credentials.Password = bcrypt.hashSync(pasword, SaltRounds);
  }

  validatePassword(pasword: string) {
    return bcrypt.compareSync(pasword, this.Credentials.Password);
  }
}
