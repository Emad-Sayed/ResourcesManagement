export class Assignment {
  taskId: number;
  typeId: number;
  resourceId: number;
  name: string;
  description: string;
  priorityId: number;
  startDate: Date;
  endDate: Date;
  checked?: boolean;
  approvedByResource?: boolean;
  comment?: string;
  prioityName?: string;
  resourceName?: string;
  taskStateId?: number;
  taskStateName?: string;
  typeName?: string;
}