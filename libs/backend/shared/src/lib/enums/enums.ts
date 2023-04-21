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
export enum AttemptType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  PAYMENT = 'PAYMENT',
  PHONE_VERIFICATION = 'PHONE_VERIFICATION',
}
registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(USerStatus, { name: 'USerStatus' });
