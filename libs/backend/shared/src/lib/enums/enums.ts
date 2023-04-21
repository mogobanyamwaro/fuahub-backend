import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
}

export enum USerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
  REVIEW = 'review',
}
registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(USerStatus, { name: 'USerStatus' });
