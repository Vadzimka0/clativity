import { ServiceTypeEnum } from '../enum';

export type ServiceInfo = {
  service_type: ServiceTypeEnum;
  service_qnt: number;
  neuron_qnt: number;
  api?: string;
};

export const SERVICES: ServiceInfo[] = [
  {
    service_type: ServiceTypeEnum.VERSE,
    service_qnt: 1,
    neuron_qnt: 20,
    api: 'openai',
  },
  {
    service_type: ServiceTypeEnum.CREATIVE,
    service_qnt: 1,
    neuron_qnt: 10,
    api: 'openai',
  },
  {
    service_type: ServiceTypeEnum.PARAPHRASE,
    service_qnt: 1,
    neuron_qnt: 5,
    api: 'openai',
  },
  {
    service_type: ServiceTypeEnum.TEXT_TO_SPEECH,
    service_qnt: 1,
    neuron_qnt: 20,
    api: 'fliki',
  },
  {
    service_type: ServiceTypeEnum.IMAGE,
    service_qnt: 1,
    neuron_qnt: 20,
    api: 'fliki',
  },
];
