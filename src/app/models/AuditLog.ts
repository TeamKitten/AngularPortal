import {Member} from './Member';

export class AuditOperation {
  readonly id: number;
  readonly operationCode: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class AuditLog {
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly target: Member;
  readonly requester: Member;
  readonly operation: AuditOperation;
}
