export interface IDeformationChart {
  id: string;
  objectId: string;
  points: Points;
  startDate: string;
  endDate: string;
  criticalEndDate: string;
}

interface Points {
  [date: string]: number;
}
