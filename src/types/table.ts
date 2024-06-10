export interface IThermistorChain {
  id: string;
  time: string;
  objectId: string;
  sensorType: string;
  status: boolean;
  data: DataThermistorChain;
  state: string;
  criticalTemperature: number;
  minDepth: number;
  maxDepth: number;
  averageTemperature: number;
}

export interface IDeformationControl {
  time: string;
  objectId: string;
  sensorType: string;
  status: boolean;
  data: DataDeformationControl;
  state: string;
  criticalDelta: number;
}

interface DataThermistorChain {
  [key: string]: NValue;
}

interface NValue {
  value: number;
  isValid: boolean;
}

interface DataDeformationControl {
  value: number;
  isValid: boolean;
  delta?: number;
}
