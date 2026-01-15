import { Exclude } from 'class-transformer';

export class User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  
  @Exclude()
  passwordHash: string;
  
  isBlacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}